import React from 'react'
import { useState } from 'react';
import QaList from './QaList'
import { questions } from './demo-questions'
import Timer from '../Timer/timer'
export default function Sample(props) {

    const [marked, setMarked] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [response,setResponse]=useState([]);
    
    function handleOnCellClick(index) {
        setCurrentQuestion(questions[index]);
        setCurrentIndex(index)
    }
    function handleClearResponse(ques)
    {  
        const newArray=response.filter((value)=>value.qindex!==ques.qindex)
        setResponse(newArray);      
    }

    function handleOptionClick(value)
    {
        const index=response.findIndex((value)=>currentQuestion.qindex===value.qindex)
        if(index> -1)
        {
            console.log('index is '+index)
            handleClearResponse(currentQuestion);
        }
       
        const newResp=[...response,{
            qindex:currentQuestion.qindex,
            qresponse:value
        }];
        setResponse(newResp);
        refreshMarked(currentQuestion)
        console.info(newResp);
    }
    function refreshMarked(ques){
        if(marked.includes(ques.qindex))
        {
            console.info('yes contains')
            const newArray=marked.filter((value)=>value!==ques.qindex)
            setMarked(newArray);
        }

    }
    function handleMarkClick(ques)
    {
        setMarked([...marked,ques.qindex]);
    }
    function CheckAttempted(ques)
    {
        return(response.findIndex((value)=>{ 
            return value.qindex===ques.qindex;
        })> -1);
    }
    function getAttemptedArray()
    {
        let arr=[];
        response.forEach((item,index)=>{
            arr.push(item.qindex);
        })
        return arr;
    }
    function isChecked(Value)
    {
        if(!CheckAttempted(currentQuestion))
            return false;
        else
        {   
            const item=response.find((item)=>currentQuestion.qindex===item.qindex)
            if(item!=null)
            {
                return Value===item.qresponse;
            }
            return false;
        }
    }
    
    return (
        <div id="mock-test">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                        <div id="test-controls" className='my-3' >
                            <h4>Jerin Sebastian</h4>
                            <Timer
                            initialMinute={0}
                            initialSeconds={10}
                            onTimeout={()=>{console.log("timeout")}}/>
                            <button className="btn btn-danger btn-md">Submit Test</button>
                        </div>
                        <hr className="my-3" />


                        <h1 className="lead my-2"><strong>Q.</strong> {currentQuestion.question}</h1>
                        <h1 className="lead my-2"><strong>Options:</strong></h1>

                        <ul id="options-list">
                            {
                                currentQuestion.options.map((value, index) => {
                                    return <li><div className="form-check">
                                        <label htmlFor={`radio${index}`} className='form-check-label' style={{ cursor: "pointer" }}>
                                            <input type='radio' className="form-check-input" id={`radio${index}`} disabled={CheckAttempted(currentQuestion)} checked={isChecked(value)} name='optradio' value={value} onClick={()=>{handleOptionClick(value)}} />{value}
                                        </label></div></li>
                                })
                            }
                        </ul>
                        <div id="test-controls" className='my-5' >
                        <button className="btn btn-primary btn-md" disabled={currentIndex < 1} onClick={(e) => handleOnCellClick(currentIndex - 1)}>{'<Previous'}</button>
                        <button className="btn btn-primary btn-md" disabled={!CheckAttempted(currentQuestion)} onClick={(e) => handleClearResponse(currentQuestion)}>Clear Response</button>
                            <button className="btn btn-warning btn-md" disabled={CheckAttempted(currentQuestion)} onClick={(e) => handleMarkClick(currentQuestion)}>Mark Question</button>
                            <button className="btn btn-primary btn-md" disabled={currentIndex >= questions.length - 1} onClick={(e) => handleOnCellClick(currentIndex + 1)}>{'Next>'}</button>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <QaList questions={questions} attempt={getAttemptedArray()} marked={marked} rem={questions.length-response.length} onCellClick={(index) => handleOnCellClick(index)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

