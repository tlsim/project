import * as tf from '@tensorflow/tfjs';
import initFirebase from '../../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

export class ControllerDataset {
  constructor() {
    initFirebase();
    this.store = firebase.storage();
    this.db = firebase.firestore();
    this.db.settings({timestampsInSnapshots: true});
  }

  async setItemTrainingCounts(itemObj) {
    const items = await this.db.collection('item_data').get();
    items.forEach(item => {
      const count = item.data().count;
      itemObj[item.id].mlCount = count ? count : 0;
    });
    return itemObj;
  }

  getCollectionReference = async name => {
    return await this.db.collection(name);
  };

  getItemReference = async label => {
    return await this.db.collection('item_data').doc(label);
  };

  getItemCount = async itemReference => {
    return await itemReference
      .get()
      .then(snapshot => snapshot.data().count)
      .catch(() => 0);
  };

  setItemCount = async (itemReference, count) => {
    await itemReference.set({
      count
    });
  };

  changeItemCount = (label, delta) => {
    this.getItemReference(label).then(item =>
      this.getItemCount(item).then(count =>
        this.setItemCount(item, count + delta)
      )
    );
  };

  deleteImage = async dataset => {
    await this.db
      .collection('training_data')
      .doc(dataset.id)
      .delete();

    await this.changeItemCount(dataset.item, -1);
  };

  trustImage = async dataset => {
    await this.db
      .collection('training_data')
      .doc(dataset.id)
      .update({trusted: true});

    await this.changeItemCount(dataset.item, 1);
  };

  addImage = (image, trusted) => {
    this.db
      .collection('training_data')
      .add({
        img: image.img,
        activation: image.activation.dataSync().join(','),
        label: image.label,
        random: Math.random(),
        timestamp: Date.now(),
        trusted
      })
      .then(() => {
        image.activation.dispose();
      })
      .catch(() => {
        image.activation.dispose();
      });
  };

  async addExamples(examples) {
    if (examples.length < 1) {
      return;
    }

    this.changeItemCount(examples[0].label, examples.length);

    examples.forEach(image => {
      this.addImage(image, true);
    });
  }

  async getClasses() {
    const items = await this.db.collection('item_data').get();
    const idList = [];
    items.forEach(doc => {
      if (doc.data().count > 0) idList.push(doc.id);
    });
    return idList;
  }

  async getBatch(batchSize, randomness, since) {
    return new Promise(async resolve => {
      const batch = {};

      while (Object.keys(batch).length < batchSize) {
        await this.db
          .collection('training_data')
          .orderBy('random')
          .orderBy('timestamp')
          .startAt(Math.random(), since)
          .limit(batchSize * randomness)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              batch[doc.id] = doc.data();
            });
          });
      }

      resolve(Object.values(batch).splice(0, batchSize));
    });
  }

  async getTensors(setSize = 200, randomness = 0.1, since = 0) {
    const batch = await this.getBatch(setSize, randomness, since);
    const classes = await this.getClasses();
    let xs, ys;

    xs = tf.keep(tf.tensor4d(batch[0].activation.split(','), [1, 7, 7, 1024]));
    ys = tf.keep(
      tf.tidy(() =>
        tf.oneHot(
          tf.tensor1d([classes.indexOf(batch[0].label)]).toInt(),
          classes.length
        )
      )
    );

    for (let i = 1; i < batch.length; i++) {
      const y = tf.tidy(() =>
        tf.oneHot(
          tf.tensor1d([classes.indexOf(batch[i].label)]).toInt(),
          classes.length
        )
      );

      const oldX = xs;
      xs = tf.keep(
        oldX.concat(
          tf.tensor4d(batch[i].activation.split(','), [1, 7, 7, 1024]),
          0
        )
      );

      const oldY = ys;
      ys = tf.keep(oldY.concat(y, 0));
    }

    return {xs, ys, classes};
  }

  async getUntrustedImage() {
    const collectionReference = await this.getCollectionReference(
      'training_data'
    );
    return await collectionReference
      .where('trusted', '==', 'false')
      .get()
      .then(snapshot => snapshot.docs);
  }
}
