import React, { useEffect, useState } from 'react';
import Header from '../Header';
import '../../scss/app';

interface ScorecardProps { }

const Scorecard: React.FC<ScorecardProps> = ({ }) => {

    const [p1Scorecard, setP1Scorecard] =
        useState<Array<number | null>>([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
    const [p1FrontNineTotal, setP1FrontNineTotal] = useState<number>(null);
    const [p1BackNineTotal, setP1BackNineTotal] = useState<number>(null);

    const getCourseData = async () => {
        // get info about each hole
    }

    useEffect(() => {
        getCourseData();
    }, []);

    const updateScorecard = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let oldScore = p1Scorecard[index];
        let oldTotal = (index < 9) ? p1FrontNineTotal : p1BackNineTotal;
        let scores = p1Scorecard;
        scores[index] = Number(e.target.value);
        setP1Scorecard(scores);
        if (oldScore && index < 9) {
            setP1FrontNineTotal(oldTotal - oldScore + Number(e.target.value));
        } else if (!oldScore && index < 9) {
            setP1FrontNineTotal(oldTotal + Number(e.target.value));
        } else if (oldScore && index > 8) {
            setP1BackNineTotal(oldTotal - oldScore + Number(e.target.value));
        } else {
            setP1BackNineTotal(oldTotal + Number(e.target.value));
        }

    }

    return (
        <>
            <Header color='header-dark' loggedIn={true} />
            <div className="container" style={{ marginTop: '8rem' }}>
                <div className="container">
                    <form>
                        <table className="table">
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
                                    <td className="align-middle text-center">4</td>
                                    <td className="align-middle text-center">5</td>
                                    <td className="align-middle text-center">5</td>
                                    <td className="align-middle text-center">4</td>
                                    <td className="align-middle text-center">3</td>
                                    <td className="align-middle text-center">4</td>
                                    <td className="align-middle text-center">4</td>
                                    <td className="align-middle text-center">3</td>
                                    <td className="align-middle text-center">4</td>
                                    <td className="align-middle text-center">36</td>
                                    <td className="align-middle text-center">4</td>
                                    <td className="align-middle text-center">4</td>
                                    <td className="align-middle text-center">5</td>
                                    <td className="align-middle text-center">3</td>
                                    <td className="align-middle text-center">4</td>
                                    <td className="align-middle text-center">4</td>
                                    <td className="align-middle text-center">3</td>
                                    <td className="align-middle text-center">4</td>
                                    <td className="align-middle text-center">5</td>
                                    <td className="align-middle text-center">36</td>
                                    <td className="align-middle text-center">72</td>
                                </tr>
                                <tr>
                                    <th scope="row">Regan Loper</th>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 0)} /></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 1)} /></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 2)} /></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 3)} /></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 4)} /></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 5)} /></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 6)} /></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 7)} /></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 8)} /></td>
                                    <td className="align-middle text-center">{p1FrontNineTotal}</td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 9)}/></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 10)}/></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 11)}/></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 12)}/></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 13)}/></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 14)}/></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 15)}/></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 16)}/></td>
                                    <td className="align-middle text-center"><input type="number" onChange={(e) => updateScorecard(e, 17)}/></td>
                                    <td className="align-middle text-center">{p1BackNineTotal}</td>
                                    <td className="align-middle text-center">72</td>
                                </tr>
                                <tr>
                                    <th scope="row">Irving Jones</th>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"><input type="number" /></td>
                                    <td className="align-middle text-center"></td>
                                    <td className="align-middle text-center">72</td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </>
    );
}


export default Scorecard;