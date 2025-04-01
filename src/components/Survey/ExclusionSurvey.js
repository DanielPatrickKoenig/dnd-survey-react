import './ExclusionSurvey.css';
import RadioQuestion from '../RadioQuestion/RadioQuestion';
import { useState } from 'react';
const ExclusionSurvey = (props) => {
    const [selections, setSelections] = useState([]);
    const selectionHandler = (selection) => {
        const tempSelections = [...selections, selection];
        console.log(tempSelections);
        setSelections([...selections, selection]);
        if (tempSelections.length >= props.questions.length) {
            props.onComplete(tempSelections);
        }
        
    }
    return (
        <>
            {props.questions?.length && props.questions?.map((item, index) => (
                <div className={`question-conatainer ${index === selections.length ? 'active' : 'inactive'}`}>
                    <RadioQuestion 
                        question={item} onSelection={selectionHandler}
                    />
                </div>
                
            ))}
        </>
    )
}
export default ExclusionSurvey;