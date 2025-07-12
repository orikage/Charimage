import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <p>エラーが発生しました:</p>
    <pre>{message}</pre>
    <style>{`
      .error-message {
        color: red;
        background-color: #ffebeb;
        border: 1px solid red;
        padding: 15px;
        border-radius: 5px;
        margin: 10px 0;
      }
      .error-message pre {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    `}</style>
  </div>
);

export default ErrorMessage;
