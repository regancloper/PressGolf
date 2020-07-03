import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { apiService } from '../../utils/api';
import { findWithId, calculateDiff } from '../../utils/calculations';
import Header from '../Header';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

interface PostScoreProps { }

const PostScore: React.FC<PostScoreProps> = ({ }) => {
    const history = useHistory();
    const { user } = useContext(AuthContext);

    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [teeBoxOptions, setTeeBoxOptions] = useState<TeeBox[]>([]);
    const [selectedTee, setSelectedTee] = useState<string | null>(null);
    const [slope, setSlope] = useState<number>(null);
    const [courseRating, setCourseRating] = useState<number>(null);
    const [teeGender, setTeeGender] = useState<string>(null);
    const [score, setScore] = useState<number | null>(null);
    const [courses, setCourses] = useState<GolfCourse[]>([]);



    const getData = async () => {
        let courses: GolfCourse[] = [];
        try {
            let allcourses: any = await apiService('/api/courses');
            if (allcourses) {
                allcourses.map((course: any) => {
                    let courseTees = [];
                    for (let i = 1; i <= 15; i++) {
                        let key = "teeName" + i;
                        if (!course[key]) break;
                        else {
                            courseTees.push({
                                name: course[key],
                                gender: course["teeGender" + i],
                                par: course["teePar" + i],
                                courseRating: course["courseRating" + i],
                                bogeyRating: course["bogeyRating" + i],
                                slopeRating: course["slopeRating" + i]
                            });
                        }
                    }
                    let courseObj = {
                        id: course.id,
                        clubname: course.clubname,
                        city: course.city,
                        state: course.state,
                        tees: courseTees
                    }
                    courses.push(courseObj);

                });
                setCourses(courses);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleCourseSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCourse(e.target.value);
        if (e.target.value === '0') {
            setTeeBoxOptions([])
        } else {
            let index = findWithId(courses, Number(e.target.value))
            setTeeBoxOptions(courses[index].tees);
        }
    }

    const handleTeeSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        let teeObject: TeeBox = JSON.parse(e.target.value);
        setSelectedTee(teeObject.name);
        setSlope(Number(teeObject.slopeRating));
        setCourseRating(Number(teeObject.courseRating));
        setTeeGender(teeObject.gender);
    }

    const handlePostedScore = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let differential = calculateDiff(score, courseRating, slope);
        let result = await apiService('/api/scores', 'POST', {
            userid: user.userid,
            courseid: Number(selectedCourse),
            score,
            differential,
            teeName: selectedTee,
            teeGender
        });

        if (result) {
            console.log(result);
            history.push('/');
        }
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            <Header color='header-dark' loggedIn={true} />
            <div className="container" id="content-container">
                <div className="py-3 container rounded-0 shadow-lg mt-5">
                    <form onSubmit={handlePostedScore}>

                        <div className="form-group">
                            <label>Course Name</label>
                            <select className="form-control" onChange={handleCourseSelect}>
                                <option value='0'>--Select One--</option>
                                {courses.map(course => {
                                    return (
                                        <option key={course.id} value={course.id}>{course.clubname}</option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Tee Box</label>
                            <select
                                className="form-control"
                                onChange={handleTeeSelect}
                                disabled={!(selectedCourse) || (selectedCourse === '0')}
                            >
                                <option>--Select One--</option>
                                {teeBoxOptions.map(teeBox => {
                                    return (
                                        <option
                                            key={`${teeBox.name}-${teeBox.gender}`}
                                            value={JSON.stringify(teeBox)}
                                        >
                                            {teeBox.name} - ({teeBox.courseRating} / {teeBox.slopeRating}) ({teeBox.gender})
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Score</label>
                            <input type="text" className="form-control" placeholder="Score:"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScore(Number(e.target.value))}
                                style={{ width: '20%' }}
                            />
                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary rounded-0"
                            disabled={selectedCourse === null || selectedTee ===  null || score === null}
                        >
                            Post Score
                        </button>

                        <Link to="/" className="btn btn-light border border-primary text-primary rounded-0">
                            Go Back
                        </Link>

                    </form>
                </div >
            </div>

        </>
    );

}


interface GolfCourse {
    id: number;
    clubname: string;
    city: string;
    state: string;
    tees: TeeBox[];
}

interface TeeBox {
    name: string;
    gender: string;
    par: number;
    courseRating: number;
    bogeyRating: number;
    slopeRating: number;
}

// interface RawCourseData {
//     id: number,
//     clubname: string,
//     city: string,
//     state: string,
//     [index: string]: string | number
// }

export default PostScore;



