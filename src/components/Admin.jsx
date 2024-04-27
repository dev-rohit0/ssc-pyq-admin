// src/components/AdminPanel/AdminPanel.js
import React, { useState } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Import CSS styles

const Admin = () => {
    // State variables for form inputs
    const [questionId, setQuestionId] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [yearAsked, setYearAsked] = useState('');
    const [topic, setTopic] = useState('');

    // State for feedback message
    const [feedback, setFeedback] = useState('');

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Parse options input into an array
        const optionsArray = options.split(',').map(option => option.trim());

        // Create question data object
        const questionData = {
            question_id: questionId,
            question_text: questionText,
            options: optionsArray,
            correct_answer: correctAnswer,
            year_asked: parseInt(yearAsked, 10),
            topic
        };

        try {
            // Send question data to API endpoint
            const response = await axios.post('http://localhost:3000/api/questions/', questionData);

            // Provide feedback to user
            setFeedback(`Success: Question "${questionText}" added.`);

            // Reset form fields
            setQuestionId('');
            setQuestionText('');
            setOptions('');
            setCorrectAnswer('');
            setYearAsked('');
            setTopic('');
        } catch (error) {
            // Provide feedback in case of error
            setFeedback(`Error: Could not add question. ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="admin-panel">
            <h1>Add New Question</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Question ID:</label>
                    <input
                        type="text"
                        value={questionId}
                        onChange={(e) => setQuestionId(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Question Text:</label>
                    <input
                        type="text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Options (comma-separated):</label>
                    <input
                        type="text"
                        value={options}
                        onChange={(e) => setOptions(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Correct Answer:</label>
                    <input
                        type="text"
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Year Asked:</label>
                    <input
                        type="number"
                        value={yearAsked}
                        onChange={(e) => setYearAsked(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Topic:</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Question</button>
            </form>

            {/* Display feedback message */}
            {feedback && (
                <div className="feedback-message">
                    {feedback}
                </div>
            )}
        </div>
    );
};

export default Admin;
