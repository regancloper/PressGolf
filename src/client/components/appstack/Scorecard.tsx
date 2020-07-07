import React, { useEffect, useState, useContext, useRef } from 'react';
import Header from '../Header';
import '../../scss/app';
import { useLocation, useHistory } from 'react-router-dom';
import { apiService } from '../../utils/api';
import { calculateDiff } from '../../utils/calculations';
import { AuthContext } from '../providers/AuthProvider';

interface ScorecardProps { }

const Scorecard: React.FC<ScorecardProps> = () => {

    const location = useLocation<CourseData>();
    const history = useHistory();
    const { user } = useContext(AuthContext);

    const [holes, setHoles] = useState<number[]>([]);
    const [frontNinePar, setFrontNinePar] = useState(0);
    const [backNinePar, setBackNinePar] = useState(0);
    const [p1Scorecard, setP1Scorecard] =
        useState<Array<number | null>>([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
    const [p1FrontNineTotal, setP1FrontNineTotal] = useState<number>(null);
    const [p1BackNineTotal, setP1BackNineTotal] = useState<number>(null);
    const [score, setScore] = useState<number>(null);
    const [scoreComplete, setScoreComplete] = useState(false);


    const inputRefs: React.MutableRefObject<HTMLInputElement>[] = [];
    for (let i = 0; i < 18; i++) {
        const ref = useRef<HTMLInputElement>();
        inputRefs.push(ref);
    }


    // get info about each hole's par score
    const getCourseData = async () => {
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
        if (e.target.value.length > 0 && e.target.value !== '1' && index < 17) {
            elem = inputRefs[index + 1];
            elem.current.focus();
        }
    };

    const updateScorecard = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
            setScore(p1BackNineTotal + newNineTotal);
        } else {
            setP1BackNineTotal(newNineTotal);
            setScore(p1FrontNineTotal + newNineTotal);
        }
        if (!(p1Scorecard.includes(null) || p1Scorecard.includes(0))) setScoreComplete(true);
        if (Number(e.target.value) < 1) setScoreComplete(false);
    }

    const handlePostedScore = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let differential = calculateDiff(score, location.state.courseRating, location.state.slope);
        let result = await apiService('/api/scores', 'POST', {
            userid: user.userid,
            courseid: location.state.selectedCourseId,
            score,
            differential,
            teeName: location.state.selectedTee,
            teeGender: location.state.teeGender
        });
        if (result) history.push('/');
    }


    return (
        <>
            <Header color='header-dark' loggedIn={true} />
            <div className="container" style={{ marginTop: '8rem' }}>
                <div className="container">
                    <div className="py-3 d-flex flex-column">

                        <h1 className="text-center">{location.state.selectedCourseName}</h1>
                        <div className="text-center">Course Rating: {location.state.courseRating} | Slope: {location.state.slope}</div>
                    </div>

                    <form>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Hole</th>
                                    <th scope="col">1</th>
                                    <th scope="col">2</th>
                                    <th scope="col">3</th>
                                    <th scope="col">4</th>
                                    <th scope="col">5</th>
                                    <th scope="col">6</th>
                                    <th scope="col">7</th>
                                    <th scope="col">8</th>
                                    <th scope="col">9</th>
                                    <th scope="col">Out</th>
                                    <th scope="col">10</th>
                                    <th scope="col">11</th>
                                    <th scope="col">12</th>
                                    <th scope="col">13</th>
                                    <th scope="col">14</th>
                                    <th scope="col">15</th>
                                    <th scope="col">16</th>
                                    <th scope="col">17</th>
                                    <th scope="col">18</th>
                                    <th scope="col">In</th>
                                    <th scope="col">Total</th>
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
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[0]} onChange={(e) => updateScorecard(e, 0)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[1]} onChange={(e) => updateScorecard(e, 1)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[2]} onChange={(e) => updateScorecard(e, 2)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[3]} onChange={(e) => updateScorecard(e, 3)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[4]} onChange={(e) => updateScorecard(e, 4)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[5]} onChange={(e) => updateScorecard(e, 5)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[6]} onChange={(e) => updateScorecard(e, 6)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[7]} onChange={(e) => updateScorecard(e, 7)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[8]} onChange={(e) => updateScorecard(e, 8)} /></td>
                                    <td className="align-middle text-center">{p1FrontNineTotal}</td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[9]} onChange={(e) => updateScorecard(e, 9)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[10]} onChange={(e) => updateScorecard(e, 10)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[11]} onChange={(e) => updateScorecard(e, 11)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[12]} onChange={(e) => updateScorecard(e, 12)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[13]} onChange={(e) => updateScorecard(e, 13)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[14]} onChange={(e) => updateScorecard(e, 14)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[15]} onChange={(e) => updateScorecard(e, 15)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[16]} onChange={(e) => updateScorecard(e, 16)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[17]} onChange={(e) => updateScorecard(e, 17)} /></td>
                                    <td className="align-middle text-center">{p1BackNineTotal}</td>
                                    <td className="align-middle text-center">{score}</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <table className="table table-bordered d-none">
                            <thead>
                                <tr>
                                    <th scope="row">Hole</th>
                                    <th scope="col">10</th>
                                    <th scope="col">11</th>
                                    <th scope="col">12</th>
                                    <th scope="col">13</th>
                                    <th scope="col">14</th>
                                    <th scope="col">15</th>
                                    <th scope="col">16</th>
                                    <th scope="col">17</th>
                                    <th scope="col">18</th>
                                    <th scope="col">In</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Par</th>
                                    {holes.slice(9).map((hole, index) => (
                                        <td key={`back-${index}`} className="align-middle text-center">{hole}</td>
                                    ))}
                                    <td className="align-middle text-center">{backNinePar}</td>
                                    <td className="align-middle text-center">{frontNinePar + backNinePar}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="align-middle">Regan</th>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[9]} onChange={(e) => updateScorecard(e, 9)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[10]} onChange={(e) => updateScorecard(e, 10)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[11]} onChange={(e) => updateScorecard(e, 11)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[12]} onChange={(e) => updateScorecard(e, 12)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[13]} onChange={(e) => updateScorecard(e, 13)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[14]} onChange={(e) => updateScorecard(e, 14)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[15]} onChange={(e) => updateScorecard(e, 15)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[16]} onChange={(e) => updateScorecard(e, 16)} /></td>
                                    <td className="align-middle text-center"><input type="number" ref={inputRefs[17]} onChange={(e) => updateScorecard(e, 17)} /></td>
                                    <td className="align-middle text-center">{p1BackNineTotal}</td>
                                    <td className="align-middle text-center">{score}</td>
                                </tr>
                            </tbody>
                        </table> */}
                    </form>
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

type CourseData = {
    selectedCourseId: number;
    selectedCourseName: string;
    slope: number;
    courseRating: number;
    teeGender: string;
    selectedTee: string;
}