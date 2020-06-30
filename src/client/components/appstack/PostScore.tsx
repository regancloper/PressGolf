import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { apiService } from '../../utils/api';
import { findWithId } from '../../utils/calculations';
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
    const [score, setScore] = useState<number | null>(null);
    const [courses, setCourses] = useState<GolfCourse[]>([]);



    const getData = async () => {
        let courses: GolfCourse[] = [];
        try {
            let allcourses = await apiService('/api/courses');
            allcourses.map((course: RawCourseData) => {
                if (course.teeName1) {
                    let courseObj = {
                        id: course.id,
                        clubname: course.clubname,
                        city: course.city,
                        state: course.state,
                        tees: [
                            {
                                name: course.teeName1,
                                gender: course.teeGender1,
                                par: course.teePar1,
                                courseRating: course.courseRating1,
                                bogeyRating: course.bogeyRating1,
                                slopeRating: course.slopeRating1
                            },
                            {
                                name: course.teeName2,
                                gender: course.teeGender2,
                                par: course.teePar2,
                                courseRating: course.courseRating2,
                                bogeyRating: course.bogeyRating2,
                                slopeRating: course.slopeRating2
                            },
                            {
                                name: course.teeName3,
                                gender: course.teeGender3,
                                par: course.teePar3,
                                courseRating: course.courseRating3,
                                bogeyRating: course.bogeyRating3,
                                slopeRating: course.slopeRating3
                            },
                            {
                                name: course.teeName4,
                                gender: course.teeGender4,
                                par: course.teePar4,
                                courseRating: course.courseRating4,
                                bogeyRating: course.bogeyRating4,
                                slopeRating: course.slopeRating4
                            },
                            {
                                name: course.teeName5,
                                gender: course.teeGender5,
                                par: course.teePar5,
                                courseRating: course.courseRating5,
                                bogeyRating: course.bogeyRating5,
                                slopeRating: course.slopeRating5
                            },
                        ]
                    }
                    courses.push(courseObj);
                }
            });
            setCourses(courses);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCourseSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCourse(e.target.value);
        if (e.target.value === '0') {
            setTeeBoxOptions([])
        };
        let index = findWithId(courses, Number(e.target.value))
        setTeeBoxOptions(courses[index].tees);
    }

    const handleTeeSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTee(e.target.value);
    }

    const handlePostedScore = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let result = await apiService('/api/scores', 'POST', {
            userid: user.userid,
            courseid: Number(selectedCourse),
            score
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
                <div className="py-3 container rounded-0 shadow-lg border border-primary mt-5">
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
                                            value={teeBox.name}>{teeBox.name} - ({teeBox.courseRating} / {teeBox.slopeRating})
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


                        <button type="submit" className="btn btn-primary rounded-0">
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

interface RawCourseData {
    id: number,
    clubname: string,
    city: string,
    state: string,
    teeName1: string,
    teeGender1: string,
    teePar1: number,
    courseRating1: number,
    bogeyRating1: number,
    slopeRating1: number,
    teeName2: string,
    teeGender2: string,
    teePar2: number,
    courseRating2: number,
    bogeyRating2: number,
    slopeRating2: number,
    teeName3: string,
    teeGender3: string,
    teePar3: number,
    courseRating3: number,
    bogeyRating3: number,
    slopeRating3: number,
    teeName4: string,
    teeGender4: string,
    teePar4: number,
    courseRating4: number,
    bogeyRating4: number,
    slopeRating4: number,
    teeName5: string,
    teeGender5: string,
    teePar5: number,
    courseRating5: number,
    bogeyRating5: number,
    slopeRating5: number,
    teeName6: string,
    teeGender6: string,
    teePar6: number,
    courseRating6: number,
    bogeyRating6: number,
    slopeRating6: number,
    teeName7: string,
    teeGender7: string,
    teePar7: number,
    courseRating7: number,
    bogeyRating7: number,
    slopeRating7: number,
    teeName8: string,
    teeGender8: string,
    teePar8: number,
    courseRating8: number,
    bogeyRating8: number,
    slopeRating8: number,
    teeName9: string,
    teeGender9: string,
    teePar9: number,
    courseRating9: number,
    bogeyRating9: number,
    slopeRating9: number,
    teeName10: string,
    teeGender10: string,
    teePar10: number,
    courseRating10: number,
    bogeyRating10: number,
    slopeRating10: number,
    teeName11: string,
    teeGender11: string,
    teePar11: number,
    courseRating11: number,
    bogeyRating11: number,
    slopeRating11: number,
    teeName12: string,
    teeGender12: string,
    teePar12: number,
    courseRating12: number,
    bogeyRating12: number,
    slopeRating12: number,
    teeName13: string,
    teeGender13: string,
    teePar13: number,
    courseRating13: number,
    bogeyRating13: number,
    slopeRating13: number,
    teeName14: string,
    teeGender14: string,
    teePar14: number,
    courseRating14: number,
    bogeyRating14: number,
    slopeRating14: number,
    teeName15: string,
    teeGender15: string,
    teePar15: number,
    courseRating15: number,
    bogeyRating15: number,
    slopeRating15: number
}

export default PostScore;



