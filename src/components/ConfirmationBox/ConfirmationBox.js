import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';
import './ConfirmationBox.css';

class ConfirmationBox extends React.Component {
	handleYes = () => {
		const {setActualItem, id, sendWithPhoto, history} = this.props;
		setActualItem(id);
		const nextPage = sendWithPhoto ? 'snackchat' : 'slackname';
		history.push('/' + nextPage);
	};

	handleNo = () => {
		this.props.history.push('/editSnack');
	};

	render() {
		return (
			<div>
				<Logo />
				<div className="text-confirmation">{`Is this a ${
					this.props.name
				}?`}</div>
				<div className="placeholder">
					<svg
						className="placeholder-bg"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 242 141">
						<g>
							<polygon
								fill="#F28159"
								points="110.53,67.51 106.53,101.3 153.54,106.85 157.54,73.07 	"
							/>
							<polygon
								fill="#DD603A"
								points="124.18,103.09 125.69,84.54 127.58,69.64 111.86,67.82 109.96,101.46 	"
							/>
						</g>
						<polygon
							fill="#C1E9F7"
							points="242,68.5 142.06,58 136,115.68 242,126.82 "
						/>
						<g>
							<path
								fill="#F28159"
								d="M123.16,100.56l1.89-29.5L97.24,35.04l-83.27,5.97l-11.5,7.1c7.89,24.68,10.73,52.31,31.98,69.28
							c11.65,9.29,30.22,21.65,45.03,13.87c5.72-3,10.4-10.55,16.08-14.32C99.6,114.26,122.83,105.72,123.16,100.56"
							/>
							<path
								fill="#DD603A"
								d="M97.56,34.79l11.11,14.37l-1.65,25.63C66.21,104.2,32.22,96.15,16.1,89.14L2.89,47.86l11.49-7.1
							L97.56,34.79z"
							/>
						</g>
					</svg>
					<svg
						className="placeholder-fg"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 242 141">
						<g>
							<path
								fill="#F28159"
								d="M2.08,69.4c0.2,4.73,4.22,8.39,9,8.14l11.97-0.61c4.77-0.25,8.48-4.29,8.27-9.04
							c-0.21-4.75-4.22-8.39-9-8.14l-11.97,0.61C5.58,60.62,1.87,64.65,2.08,69.4"
							/>
							<path
								fill="#F4A78E"
								d="M23.31,72.94l-6.49,0.38c-2.94,0.17-5.46-2.06-5.6-4.99c-0.14-2.94,2.13-5.43,5.08-5.61
							l6.49-0.38L23.31,72.94z"
							/>
						</g>
						<g>
							<path
								fill="#F28159"
								d="M0.29,44.35c0.33,5.83,5.26,10.38,11.01,10.17L25.68,54c5.74-0.2,10.12-5.08,9.79-10.89
							c-0.33-5.83-5.26-10.38-10.98-10.18l-14.39,0.49C4.33,33.63-0.03,38.53,0.29,44.35"
							/>
							<path
								fill="#F4A78E"
								d="M25.05,48.7l-7.96,0.33c-3.61,0.15-6.74-2.69-6.96-6.36c-0.25-3.65,2.5-6.75,6.09-6.9
							l7.96-0.33L25.05,48.7z"
							/>
						</g>
						<g>
							<path
								fill="#F28159"
								d="M8.74,84c-1.32,4.49,1.25,9.3,5.71,10.72l11.23,3.54c4.48,1.41,9.19-1.09,10.51-5.58
							c1.32-4.49-1.25-9.3-5.71-10.72l-11.23-3.54C14.76,77,10.07,79.5,8.74,84"
							/>
							<path
								fill="#F4A78E"
								d="M26.99,94.63l-6.14-1.85c-2.79-0.84-4.38-3.77-3.57-6.59c0.81-2.78,3.73-4.38,6.53-3.54
							l6.14,1.85L26.99,94.63z"
							/>
						</g>
						<g>
							<path
								fill="#F28159"
								d="M14.46,106.82c-1.31,4.49,1.25,9.3,5.71,10.72l11.23,3.54c4.48,1.41,9.19-1.09,10.51-5.58
							c1.34-4.5-1.25-9.3-5.71-10.72l-11.23-3.54C20.5,99.81,15.79,102.32,14.46,106.82"
							/>
							<path
								fill="#F4A78E"
								d="M32.03,117.51l-6.22-1.8c-2.81-0.83-4.42-3.75-3.56-6.59c0.85-2.8,3.82-4.44,6.66-3.62
							l6.22,1.8L32.03,117.51z"
							/>
						</g>
						<path
							fill="#F28159"
							d="M66.93,0.48c0,0-5.11,6.85,0.02,16.44l12.02,14.85l7.74,14.01l1.75,8.45
						c-3.23,8.66-2.65,9.96,0.58,18.84c2.94,8.11,4.89,22.36,14.68,24.68c8.82,2.07,18.65-5.31,20.9-13.6
						c3.78-14.12-3.12-30.74-11.94-41.57c-0.01-0.02-20.96-25.74-20.96-25.74L66.93,0.48z"
						/>
					</svg>
				</div>
				<div>
					<button
						className="button button-editsnack"
						testAttribute="NO"
						onClick={this.handleNo}>
						Edit Snack
					</button>
					<button
						className="button button-yes"
						testAttribute="YES"
						onClick={this.handleYes}>
						Yes
					</button>
				</div>
			</div>
		);
	}
}

ConfirmationBox.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired
};

export default ConfirmationBox;
