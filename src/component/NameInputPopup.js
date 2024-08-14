import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const NameInputPopup = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      try {
        const response = await axios.post('https://graze99.com/api/api.php?action=getRankings', {
          action: 'checkUserName',
          userName: name.trim()
        });

        if (response.data.exists) {
          if (response.data.count >= 3) {
            setError("이미 3회 참여하셨습니다. 더 이상 참여할 수 없습니다.");
          } else {
            const newName = `${name.trim()}${response.data.count}`;
            setError(`이미 ${response.data.count}차례 참여하셨습니다. 이름이 "${newName}"로 변경되었습니다.`);
            setName(newName);
          }
        } else {
          onSubmit(name.trim());
        }
      } catch (error) {
        console.error("Error checking username:", error);
        setError(error.response?.data?.message || "사용자 이름 확인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="popup-overlay d-flex justify-content-center align-items-center">
      <div className="popup-content bg-white rounded shadow p-4">
        <h2 className="text-center">Enter Your Name</h2>
        <p className="text-center">수강신청 이름을 입력해 주세요</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>
          {error && <p className="error-message text-danger text-center">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">Start Game</button>
        </form>
        <button onClick={onClose} className="btn btn-secondary w-100 mt-2">Cancel</button>
      </div>
    </div>
  );
};

export default NameInputPopup;