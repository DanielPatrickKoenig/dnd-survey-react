import './RadioQuestion.css';
import { useState } from "react";
const responses = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
const RadioQuestion = (props) => {
    const [selection, setSelection] = useState(-1);
    const changeHandler = (e) => {
        const value = e.target.value;
        const group = e.target.getAttribute('group');
        setSelection({ value, group });
    }
    return (
        <div>
            <h2>{props.question.text}</h2>
            {responses.map((item, index) => (
                <label>
                    <span>{item}</span>
                    <input
                        type="radio"
                        group={props.question.exclusion_group}
                        value={index}
                        name={props.question.text}
                        onChange={changeHandler}
                    />
                </label>
            ))}
            <button 
                onClick={() => props.onSelection(selection)}
                disabled={selection < 0}
            >
                Confirm
            </button>
        </div>
    )
}
export default RadioQuestion;