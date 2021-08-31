// import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import checkIcon from './check-solid.svg'

import './ProgressBar.style';

export class ProgressBar extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    constructor(props) {
        super(props);
        this.state = {
            numberOfStages: 2,
            stagesArray: [],
            titles: ["Shipping", "Review & Payments"],
            activeParts: 0,
        }
    }

    componentDidMount() {
        let array = [];
        for(let i = 1; i <= this.props.numberOfStages; i++) {
            array.push(i);
        }

        this.handleChangeActiveParts();

        if(this.props.numberOfStages) {
            this.handleChangeNumberOfStages(this.props.numberOfStages);
        }

        if(this.props.titles) {
            this.handleChangeTitles(this.props.titles);
        }

        this.setState(prev => ({
            ...prev,
            stagesArray: [...array],
        }))
    }

    componentDidUpdate(prevProps) {
        if(prevProps.checkoutStep !== this.props.checkoutStep) {
            this.handleChangeActiveParts();
        }
    }
    
    handleChangeNumberOfStages(numberOfStages) {
        this.setState(prev => ({
            ...prev,
            numberOfStages: numberOfStages,
        }))
    }

    handleChangeTitles(titles) {
        this.setState(prev => ({
            ...prev,
            titles: [...titles],
        }))
    }

    handleChangeActiveParts() {
        const {
            checkoutStep,
            checkoutSteps
        } = this.props;

        let activeParts = 0;
        checkoutSteps.forEach((element, i) => {
            if(element === checkoutStep) {
                activeParts = i + 1;
            }
        });

        console.log(activeParts)

        this.setState(prev => ({
            ...prev,
            activeParts: activeParts
        }))
    }

    renderActiveStagePosition(checkbox, positionIndex) {
        if(checkbox) {
            return(
                <img block="ProgressBar" elem="IconProgressStage" src={checkIcon}/>
            );
        } else {
            return(
                <p block="ProgressBar" elem="IndexProgressStageActive">{positionIndex}</p>
            );
        }
    }

    renderStage(positionIndex, title) {
        const {activeParts} = this.state;
        if(activeParts >= positionIndex) {
            return(
                <React.Fragment key={positionIndex}>
                    <div block="ProgressBar" elem={positionIndex === 1 ? "ProgressLine" : "ProgressLineCenter"}>
                        <div block="ProgressBar" elem={positionIndex === 1 ? "ProgressLineActive" : "ProgressLineCenterActive"}></div>
                    </div>
                    <div block="ProgressBar" elem="ProgressStageActive">
                        {this.renderActiveStagePosition(activeParts - positionIndex >= 1, positionIndex)}
                        <div block="ProgressBar" elem="TitleProgressStageActive">
                            <p>{title}</p>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return(
                <React.Fragment>
                    <div block="ProgressBar" elem={positionIndex === 1 ? "ProgressLine" : "ProgressLineCenter"}/>
                    <div block="ProgressBar" elem="ProgressStage">
                        <p block="ProgressBar" elem="IndexProgressStage">{positionIndex}</p>
                        <div block="ProgressBar" elem="TitleProgressStage">
                            <p>{title}</p>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        
    }

    renderStages() {
        const {titles, activeParts, stagesArray} = this.state;
        return(
            <React.Fragment>
                {stagesArray.map((stage, i) => this.renderStage(i + 1, titles[i]))}
                <div block="ProgressBar" elem="ProgressLine">
                    {activeParts === stagesArray.length + 1 && <div block="ProgressBar" elem="ProgressLineActive"></div>}
                </div>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div block="ProgressBar">
                { this.renderStages() }
            </div>
        );
    }
}

export default ProgressBar;
