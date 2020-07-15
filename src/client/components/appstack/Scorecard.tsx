import React, { useEffect, useState, useContext, useRef } from 'react';
import Header from '../Header';
import '../../scss/app';
import { useLocation, useHistory } from 'react-router-dom';
import { apiService } from '../../utils/api';
import { calculateDiff, calculateIndex } from '../../utils/calculations';
import { AuthContext } from '../providers/AuthProvider';
import { TableScore, RoundData, Friend } from '../../utils/types';

interface ScorecardProps { }

const Scorecard: React.FC<ScorecardProps> = () => {

    const location = useLocation<RoundData>();
    const history = useHistory();
    const { user } = useContext(AuthContext);

    const [holes, setHoles] = useState<number[]>([]);
    const [frontNinePar, setFrontNinePar] = useState(0);
    const [backNinePar, setBackNinePar] = useState(0);
    const [p1Scorecard, setP1Scorecard] =
        useState<Array<number | null>>([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
    const [p1FrontNineTotal, setP1FrontNineTotal] = useState<number>(null);
    const [p1BackNineTotal, setP1BackNineTotal] = useState<number>(null);
    const [p1Score, setP1Score] = useState<number>(null);
    const [scoreComplete, setScoreComplete] = useState(false);
    const [playingPartner, setPlayingPartner] = useState<Friend | null>(location.state.playingPartner);
    const [p2Scorecard, setP2Scorecard] = useState<null | Array<number | null>>(null);
    const [p2FrontNineTotal, setP2FrontNineTotal] = useState<number>(null);
    const [p2BackNineTotal, setP2BackNineTotal] = useState<number>(null);
    const [p2Score, setP2Score] = useState<number>(null);
    const [matchScore, setMatchScore] =
        useState<Array<number | null>>([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);


    const inputRefs: React.MutableRefObject<HTMLInputElement>[] = [];
    let numPlayers = (playingPartner) ? 2 : 1;
    for (let i = 0; i < (numPlayers * 18); i++) {
        const ref = useRef<HTMLInputElement>();
        inputRefs.push(ref);
    }


    // get info about each hole's par score
    const getCourseData = async () => {
        if (playingPartner) {
            setP2Scorecard([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
            // setMatchScore([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
        }
        try {
            let data: (false | { holes: string }) = await apiService(`/api/holes/${location.state.selectedCourseId}`);
            if (data) {
                const holesArray = data.holes.split('').map(num => Number(num));
                setHoles(holesArray);
                setFrontNinePar(holesArray.slice(0, 9).reduce((acc, cur) => acc + cur));
                setBackNinePar(holesArray.slice(9).reduce((acc, cur) => acc + cur));
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getCourseData();
    }, []);


    const autoTab = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let elem: React.MutableRefObject<HTMLInputElement>;
        // if playing partner exists, move to their score input
        if (playingPartner) {
            if (e.target.value.length > 0 && e.target.value !== '1' && index < 18) {
                elem = inputRefs[index + 18];
                elem.current.focus();
            } else if (e.target.value.length > 0 && e.target.value !== '1' && index < 35) {
                elem = inputRefs[index - 17];
                elem.current.focus();
            }
        } else {
            // if playing partner doesn't exist, move to the next input
            if (e.target.value.length > 0 && e.target.value !== '1' && index < 17) {
                elem = inputRefs[index + 1];
                elem.current.focus();
            }
        }
    };

    const updateP1Scorecard = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        // change score color based on relation to par
        if (Number(e.target.value) === holes[index] - 1) {
            e.target.style.color = 'mediumseagreen';
            e.target.style.fontWeight = 'normal';
        } else if (Number(e.target.value) > holes[index] + 1) {
            e.target.style.color = 'darkmagenta';
            e.target.style.fontWeight = 'bold';
        } else if (Number(e.target.value) === holes[index] + 1) {
            e.target.style.color = 'indianred';
            e.target.style.fontWeight = 'normal';
        } else if (Number(e.target.value) === holes[index]) {
            e.target.style.color = 'black';
            e.target.style.fontWeight = 'normal';
        } else {
            e.target.style.color = 'seagreen';
            e.target.style.fontWeight = 'bold';
        }
        // auto tab to next input
        autoTab(e, index);

        // update numbers on scorecard
        let oldScore = p1Scorecard[index];
        let oldTotal = (index < 9) ? p1FrontNineTotal : p1BackNineTotal;
        let scores = p1Scorecard;
        scores[index] = Number(e.target.value);
        setP1Scorecard(scores);
        let newNineTotal = (oldScore) ? (oldTotal - oldScore + Number(e.target.value)) : oldTotal + Number(e.target.value);
        if (index < 9) {
            setP1FrontNineTotal(newNineTotal);
            setP1Score(p1BackNineTotal + newNineTotal);
        } else {
            setP1BackNineTotal(newNineTotal);
            setP1Score(p1FrontNineTotal + newNineTotal);
        }
        if (!(p1Scorecard.includes(null) || p1Scorecard.includes(0))) setScoreComplete(true);
        if (Number(e.target.value) < 1) setScoreComplete(false);
    }

    const updateP2Scorecard = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let p2index = index - 18;
        // change score color based on relation to par
        if (Number(e.target.value) === holes[p2index] - 1) {
            e.target.style.color = 'mediumseagreen';
            e.target.style.fontWeight = 'normal';
        } else if (Number(e.target.value) > holes[p2index] + 1) {
            e.target.style.color = 'darkmagenta';
            e.target.style.fontWeight = 'bold';
        } else if (Number(e.target.value) === holes[p2index] + 1) {
            e.target.style.color = 'indianred';
            e.target.style.fontWeight = 'normal';
        } else if (Number(e.target.value) === holes[p2index]) {
            e.target.style.color = 'black';
            e.target.style.fontWeight = 'normal';
        } else {
            e.target.style.color = 'seagreen';
            e.target.style.fontWeight = 'bold';
        }
        // compare p2score to p1score and adjust matchScore array
        const matchArray = matchScore;
        if (Number(e.target.value) > p1Scorecard[p2index]) {
            (p2index === 0) ? matchArray[p2index] = 1 : matchArray[p2index] = matchArray[p2index - 1] + 1;
        } else if (Number(e.target.value) < p1Scorecard[p2index]) {
            (p2index === 0) ? matchArray[p2index] = -1 : matchArray[p2index] = matchArray[p2index - 1] - 1;
        } else {
            (p2index === 0) ? matchArray[p2index] = 0 : matchArray[p2index] = matchArray[p2index - 1];
        }
        setMatchScore(matchArray);

        // auto tab to next input
        autoTab(e, index);

        // update numbers on scorecard
        let oldScore = p2Scorecard[p2index];
        let oldTotal = (p2index < 9) ? p2FrontNineTotal : p2BackNineTotal;
        let scores = p2Scorecard;
        scores[p2index] = Number(e.target.value);
        setP2Scorecard(scores);
        let newNineTotal = (oldScore) ? (oldTotal - oldScore + Number(e.target.value)) : oldTotal + Number(e.target.value);
        if (p2index < 9) {
            setP2FrontNineTotal(newNineTotal);
            setP2Score(p2BackNineTotal + newNineTotal);
        } else {
            setP2BackNineTotal(newNineTotal);
            setP2Score(p2FrontNineTotal + newNineTotal);
        }
        if (!(p2Scorecard.includes(null) || p2Scorecard.includes(0))) setScoreComplete(true);
        if (Number(e.target.value) < 1) setScoreComplete(false);
    }

    // const checkForBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    //     let elem = inputRefs[index];
    //     if ((e.keyCode === 8 || e.keyCode === 46) && !(elem.current.value)) {
    //         elem = inputRefs[index - 1]
    //         elem.current.focus();
    //     }
    // }

    const handlePostedScore = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let differential = calculateDiff(p1Score, location.state.courseRating, location.state.slope);
        let result = await apiService('/api/scores', 'POST', {
            userid: user.userid,
            courseid: location.state.selectedCourseId,
            score: p1Score,
            differential,
            teeName: location.state.selectedTee,
            teeGender: location.state.teeGender
        });

        // get all scores (including new) and make a post request to user DB with new score and update index
        let scores = await apiService(`/api/scores/${user.userid}`);
        const diffArray: number[] = [];
        scores.forEach((score: TableScore) => {
            diffArray.push(score.differential);
        });
        let index = calculateIndex(diffArray);
        if (typeof index === 'number') {
            index = Math.round(index * 10) / 10;
            await apiService(`/api/users/${user.userid}`, 'POST', { index });
        }

        if (result) history.push('/');
    }


    return (
        <>
            <Header color='header-dark' loggedIn={true} />

            <div className="container" style={{ paddingTop: '6rem' }}>
                <div className="container">
                    <div className="py-3 d-flex flex-column">

                        <h1 className="text-center">{location.state.selectedCourseName}</h1>
                        <div className="text-center">Course Rating: {location.state.courseRating} | Slope: {location.state.slope}</div>
                    </div>

                    <div className="scrollable">
                        <form>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Hole</th>
                                        <th scope="col" className="align-middle text-center extra-width">1</th>
                                        <th scope="col" className="align-middle text-center extra-width">2</th>
                                        <th scope="col" className="align-middle text-center extra-width">3</th>
                                        <th scope="col" className="align-middle text-center extra-width">4</th>
                                        <th scope="col" className="align-middle text-center extra-width">5</th>
                                        <th scope="col" className="align-middle text-center extra-width">6</th>
                                        <th scope="col" className="align-middle text-center extra-width">7</th>
                                        <th scope="col" className="align-middle text-center extra-width">8</th>
                                        <th scope="col" className="align-middle text-center extra-width">9</th>
                                        <th scope="col" className="align-middle text-center extra-width">Out</th>
                                        <th scope="col" className="align-middle text-center extra-width">10</th>
                                        <th scope="col" className="align-middle text-center extra-width">11</th>
                                        <th scope="col" className="align-middle text-center extra-width">12</th>
                                        <th scope="col" className="align-middle text-center extra-width">13</th>
                                        <th scope="col" className="align-middle text-center extra-width">14</th>
                                        <th scope="col" className="align-middle text-center extra-width">15</th>
                                        <th scope="col" className="align-middle text-center extra-width">16</th>
                                        <th scope="col" className="align-middle text-center extra-width">17</th>
                                        <th scope="col" className="align-middle text-center extra-width">18</th>
                                        <th scope="col" className="align-middle text-center extra-width">In</th>
                                        <th scope="col" className="align-middle text-center extra-width">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Par</th>
                                        {holes.slice(0, 9).map((hole, index) => (
                                            <td key={`front-${index}`} className="align-middle text-center">{hole}</td>
                                        ))}
                                        <td className="align-middle text-center">{frontNinePar}</td>
                                        {holes.slice(9).map((hole, index) => (
                                            <td key={`back-${index}`} className="align-middle text-center">{hole}</td>
                                        ))}
                                        <td className="align-middle text-center">{backNinePar}</td>
                                        <td className="align-middle text-center">{frontNinePar + backNinePar}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="align-middle">Regan</th>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[0]} onChange={(e) => updateP1Scorecard(e, 0)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[1]} onChange={(e) => updateP1Scorecard(e, 1)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[2]} onChange={(e) => updateP1Scorecard(e, 2)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[3]} onChange={(e) => updateP1Scorecard(e, 3)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[4]} onChange={(e) => updateP1Scorecard(e, 4)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[5]} onChange={(e) => updateP1Scorecard(e, 5)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[6]} onChange={(e) => updateP1Scorecard(e, 6)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[7]} onChange={(e) => updateP1Scorecard(e, 7)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[8]} onChange={(e) => updateP1Scorecard(e, 8)} /></td>
                                        <td className="align-middle text-center">{p1FrontNineTotal}</td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[9]} onChange={(e) => updateP1Scorecard(e, 9)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[10]} onChange={(e) => updateP1Scorecard(e, 10)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[11]} onChange={(e) => updateP1Scorecard(e, 11)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[12]} onChange={(e) => updateP1Scorecard(e, 12)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[13]} onChange={(e) => updateP1Scorecard(e, 13)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[14]} onChange={(e) => updateP1Scorecard(e, 14)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[15]} onChange={(e) => updateP1Scorecard(e, 15)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[16]} onChange={(e) => updateP1Scorecard(e, 16)} /></td>
                                        <td className="align-middle text-center"><input type="number" ref={inputRefs[17]} onChange={(e) => updateP1Scorecard(e, 17)} /></td>
                                        <td className="align-middle text-center">{p1BackNineTotal}</td>
                                        <td className="align-middle text-center">{p1Score}</td>
                                    </tr>

                                    {playingPartner && (
                                        <>
                                            <tr>
                                                <th scope="row" className="align-middle">{playingPartner.firstname}</th>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[18]} onChange={(e) => updateP2Scorecard(e, 18)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[19]} onChange={(e) => updateP2Scorecard(e, 19)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[20]} onChange={(e) => updateP2Scorecard(e, 20)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[21]} onChange={(e) => updateP2Scorecard(e, 21)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[22]} onChange={(e) => updateP2Scorecard(e, 22)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[23]} onChange={(e) => updateP2Scorecard(e, 23)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[24]} onChange={(e) => updateP2Scorecard(e, 24)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[25]} onChange={(e) => updateP2Scorecard(e, 25)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[26]} onChange={(e) => updateP2Scorecard(e, 26)} /></td>
                                                <td className="align-middle text-center">{p2FrontNineTotal}</td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[27]} onChange={(e) => updateP2Scorecard(e, 27)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[28]} onChange={(e) => updateP2Scorecard(e, 28)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[29]} onChange={(e) => updateP2Scorecard(e, 29)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[30]} onChange={(e) => updateP2Scorecard(e, 30)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[31]} onChange={(e) => updateP2Scorecard(e, 31)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[32]} onChange={(e) => updateP2Scorecard(e, 32)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[33]} onChange={(e) => updateP2Scorecard(e, 33)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[34]} onChange={(e) => updateP2Scorecard(e, 34)} /></td>
                                                <td className="align-middle text-center"><input type="number" ref={inputRefs[35]} onChange={(e) => updateP2Scorecard(e, 35)} /></td>
                                                <td className="align-middle text-center">{p2BackNineTotal}</td>
                                                <td className="align-middle text-center">{p2Score}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ left: '0' }} className="position-absolute bg-dark w-100 text-center font-weight-bold text-white">Match Play</td>
                                                <td colSpan={22}>Match Play</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="align-middle">Regan</th>
                                                <td className="position-relative">{(matchScore[0] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[0] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[1] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[1] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[2] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[2] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[3] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[3] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[4] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[4] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[5] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[5] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[6] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[6] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[7] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[7] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[8] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[8] + 'UP'}</div>}</td>
                                                <td className="align-middle text-center"></td>
                                                <td className="position-relative">{(matchScore[9] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[9] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[10] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[10] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[11] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[11] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[12] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[12] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[13] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[13] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[14] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[14] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[15] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[15] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[16] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[16] + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[17] > 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{matchScore[17] + 'UP'}</div>}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th scope="row" style={{ height: '2.5em' }}></th>
                                                <td className="position-relative">{(matchScore[0] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[1] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[2] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[3] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[4] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[5] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[6] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[7] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[8] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td></td>
                                                <td className="position-relative">{(matchScore[9] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[10] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[11] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[12] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[13] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[14] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[15] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[16] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td className="position-relative">{(matchScore[17] === 0) && <div className="position-absolute h-100 w-100 bg-dark text-white border d-flex align-items-center justify-content-center">TIED</div>}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="align-middle">{playingPartner.firstname}</th>
                                                <td className="position-relative">{(matchScore[0] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[0]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[1] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[1]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[2] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[2]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[3] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[3]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[4] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[4]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[5] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[5]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[6] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[6]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[7] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[7]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[8] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[8]) + 'UP'}</div>}</td>
                                                <td></td>
                                                <td className="position-relative">{(matchScore[9] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[9]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[10] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[10]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[11] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[11]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[12] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[12]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[13] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[13]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[14] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[14]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[15] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[15]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[16] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[16]) + 'UP'}</div>}</td>
                                                <td className="position-relative">{(matchScore[17] < 0) && <div className="position-absolute h-100 w-100 bg-info text-white border d-flex align-items-center justify-content-center">{Math.abs(matchScore[17]) + 'UP'}</div>}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </form>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-primary"
                            disabled={!scoreComplete}
                            onClick={handlePostedScore}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Scorecard;

