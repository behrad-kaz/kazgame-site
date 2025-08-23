import React, { useState, useEffect } from 'react';
import styles from './PollWidget.module.css';

const API_BASE_URL = 'https://localhost:7055';

const PollWidget = () => {
    const [poll, setPoll] = useState(null);
    const [voted, setVoted] = useState(null);

    useEffect(() => {
        const fetchPoll = async () => {
            const response = await fetch(`${API_BASE_URL}/api/polls/active`);
            if(response.ok) {
                const data = await response.json();
                setPoll(data);
                const currentVote = localStorage.getItem(`poll_${data.id}`);
                if (currentVote) setVoted(true);
            }
        };
        fetchPoll();
    }, []);

    const handleVote = async (option) => {
        if (voted || !poll) return;
        const response = await fetch(`${API_BASE_URL}/api/polls/${poll.id}/vote/${option}`, { method: 'POST' });
        const updatedPoll = await response.json();
        setPoll(updatedPoll);
        setVoted(true);
        localStorage.setItem(`poll_${poll.id}`, option);
    };

    if (!poll) return <div>در حال بارگذاری نظرسنجی...</div>;

    const totalVotes = poll.optionAVotes + poll.optionBVotes;
    const percentA = totalVotes > 0 ? Math.round((poll.optionAVotes / totalVotes) * 100) : 50;
    const percentB = 100 - percentA;

    return (
        <div className={styles.widgetContainer}>
            <h3 className={styles.widgetTitle}>نبرد تایتان‌ها</h3>
            <p className={styles.pollQuestion}>{poll.title}</p>
            <div className={styles.battleground}>
                <div className={styles.option} onClick={() => handleVote('A')}>
                    <img src={`${API_BASE_URL}${poll.optionAImageUrl}`} alt={poll.optionAName} />
                    <div className={styles.optionName}>{poll.optionAName}</div>
                </div>
                <div className={styles.vs}>VS</div>
                <div className={styles.option} onClick={() => handleVote('B')}>
                    <img src={`${API_BASE_URL}${poll.optionBImageUrl}`} alt={poll.optionBName} />
                    <div className={styles.optionName}>{poll.optionBName}</div>
                </div>
            </div>
            {voted && (
                <div className={styles.results}>
                    <div className={styles.resultBarA} style={{ width: `${percentA}%` }}>{percentA}%</div>
                    <div className={styles.resultBarB} style={{ width: `${percentB}%` }}>{percentB}%</div>
                </div>
            )}
        </div>
    );
};

export default PollWidget;