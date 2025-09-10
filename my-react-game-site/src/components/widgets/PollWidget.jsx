// src/components/widgets/PollWidget.jsx (نسخه کاملاً بازطراحی شده)
import React, { useState, useEffect } from 'react';
import styles from './PollWidget.module.css';

const API_BASE_URL = 'https://localhost:7055';

const PollWidget = () => {
    const [poll, setPoll] = useState(null);
    const [votedOption, setVotedOption] = useState(null); // 'A', 'B', or null

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/polls/active`);
                if(response.ok) {
                    const data = await response.json();
                    setPoll(data);
                    // چک می‌کنیم آیا کاربر قبلاً در این نظرسنجی رای داده است یا نه
                    const currentVote = localStorage.getItem(`poll_${data.id}`);
                    if (currentVote) {
                        setVotedOption(currentVote);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch poll", error);
            }
        };
        fetchPoll();
    }, []);

    const handleVote = async (option) => {
        if (votedOption || !poll) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/polls/${poll.id}/vote/${option}`, { method: 'POST' });
            if (response.ok) {
                const updatedPoll = await response.json();
                setPoll(updatedPoll);
                setVotedOption(option);
                localStorage.setItem(`poll_${poll.id}`, option);
            }
        } catch (error) {
            console.error("Failed to submit vote", error);
        }
    };

    if (!poll) return <div className={styles.loading}>در حال بارگذاری نظرسنجی...</div>;

    const totalVotes = poll.optionAVotes + poll.optionBVotes;
    const percentA = totalVotes > 0 ? Math.round((poll.optionAVotes / totalVotes) * 100) : 0;
    const percentB = totalVotes > 0 ? 100 - percentA : 0;

    return (
        <div className={styles.widgetContainer}>
            <h3 className={styles.widgetTitle}>نبرد تایتان‌ها</h3>
            <p className={styles.pollQuestion}>{poll.title}</p>
            
            <div className={`${styles.battleground} ${votedOption ? styles.resultsShown : ''}`}>
                {/* گزینه A */}
                <div 
                    className={`${styles.option} ${styles.optionA} ${votedOption && votedOption !== 'A' ? styles.notVoted : ''}`} 
                    onClick={() => handleVote('A')}
                >
                    <img src={`${API_BASE_URL}${poll.optionAImageUrl}`} alt={poll.optionAName} className={styles.optionImage} />
                    <div className={styles.optionOverlay}></div>
                    <span className={styles.optionName}>{poll.optionAName}</span>
                    {votedOption && (
                        <>
                            <div className={styles.resultOverlayA} style={{ height: `${percentA}%` }}></div>
                            <span className={styles.resultPercent}>{percentA}%</span>
                        </>
                    )}
                </div>
                
                <div className={styles.vs}>VS</div>

                {/* گزینه B */}
                <div 
                    className={`${styles.option} ${styles.optionB} ${votedOption && votedOption !== 'B' ? styles.notVoted : ''}`} 
                    onClick={() => handleVote('B')}
                >
                    <img src={`${API_BASE_URL}${poll.optionBImageUrl}`} alt={poll.optionBName} className={styles.optionImage} />
                    <div className={styles.optionOverlay}></div>
                    <span className={styles.optionName}>{poll.optionBName}</span>
                    {votedOption && (
                         <>
                            <div className={styles.resultOverlayB} style={{ height: `${percentB}%` }}></div>
                            <span className={styles.resultPercent}>{percentB}%</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PollWidget;