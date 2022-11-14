import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import {
  fetchAllProfiles,
  fetchSingleProfile,
  updateScoreProfile,
} from "../../store/profile";
import "./PersonalityQuesitons.css";
import {
  addNewMatches,
  getProfileMatchPercentage,
  getProfileMatches,
} from "../../store/match";

function PersonalityQuestions() {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const allProfiles = useSelector((state) => state?.profiles.user_profiles);
  const currentUserProfile = useSelector(
    (state) => state?.profiles.singleProfile
  );

  const [question1, setQuestion1] = useState(1);
  const [question2, setQuestion2] = useState(1);
  const [question3, setQuestion3] = useState(1);
  const [question4, setQuestion4] = useState(1);
  const [question5, setQuestion5] = useState(1);

  useEffect(() => {
    dispatch(fetchAllProfiles());
    dispatch(fetchSingleProfile(profileId));
  }, []);

  useEffect(() => {
    let total =
      parseInt(question1) +
      parseInt(question2) +
      parseInt(question3) +
      parseInt(question4) +
      parseInt(question5);
    console.log(total);
  }, [question1]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let total =
      parseInt(question1) +
      parseInt(question2) +
      parseInt(question3) +
      parseInt(question4) +
      parseInt(question5);
    let score = {
      score: total,
    };

    dispatch(updateScoreProfile(score, profileId));

    // After updating score on user profile, create match tables that fit the criteria
    // Compare profile score with every other profiles's score
    // If score is a 'match', dispatch thunk and add to the table
    // Add matches as a state

    // Get all profiles, compare total to other profiles scores
    let matches = [];
    // console.log(allProfiles);
    for (const key in allProfiles) {
      const profile = allProfiles[key];
      // Do not compare to self
      let matchingPercentage = 0;
      if (profile.id !== parseInt(profileId) && profile.score) {
        // if score is about 60% the same, then add to match table
        if (total > profile.score) {
          matchingPercentage = profile.score / total;
        } else {
          matchingPercentage = total / profile.score;
        }
        // console.log(matchingPercentage);
        // if (matchingPercentage >= 0.6) {
        //   matches[profile.id] = {
        //     profileId: profile.id,
        //     matchPercentage: matchingPercentage,
        //   };
        // }
        let newMatch = {};
        if (matchingPercentage >= 0.6) {
          newMatch = {
            profile_id: profileId,
            matched_profile_id: profile.id,
          };
          matches.push(newMatch);
        }
      }
    }

    console.log(matches);
    // Store matches into database
    await dispatch(addNewMatches(matches));
    await dispatch(getProfileMatches());
    await dispatch(getProfileMatchPercentage());

    history.push("/profiles");
  };

  return (
    <>
      <h1>Personality Questions</h1>
      <div>
        <form>
          <div>
            <div className="question-label">
              <label>
                Would you rather go to the bar or stay home and watch movies on
                a Friday night?
              </label>
            </div>
            <div className="question-choices-container">
              <div className="question-choices-left">
                <input
                  type="radio"
                  id="choice1"
                  name="question1"
                  value={1}
                  onChange={(e) => setQuestion1(e.target.value)}
                />
                <label for="choice1">Stay home</label>
              </div>

              <div className="question-choices">
                <input
                  type="radio"
                  id="choice2"
                  name="question1"
                  value={2}
                  onChange={(e) => setQuestion1(e.target.value)}
                />
                <label for="choice2">Not sure</label>
              </div>

              <div className="question-choices-right">
                <input
                  type="radio"
                  id="choice3"
                  name="question1"
                  value={3}
                  onChange={(e) => setQuestion1(e.target.value)}
                />
                <label for="choice3">To the bar</label>
              </div>
            </div>
          </div>
          <div>
            <div className="question-label">
              <label>How would your best friend describe you?</label>
            </div>
            <div className="question-choices-container">
              <div className="question-choices-left">
                <input
                  type="radio"
                  id="choice4"
                  name="question2"
                  value={1}
                  onChange={(e) => setQuestion2(e.target.value)}
                />
                <label for="choice4">Dependable</label>
              </div>

              <div className="question-choices">
                <input
                  type="radio"
                  id="choice5"
                  name="question2"
                  value={2}
                  onChange={(e) => setQuestion2(e.target.value)}
                />
                <label for="choice5">A normie</label>
              </div>

              <div className="question-choices-right">
                <input
                  type="radio"
                  id="choice6"
                  name="question2"
                  value={3}
                  onChange={(e) => setQuestion2(e.target.value)}
                />
                <label for="choice6">Jokester</label>
              </div>
            </div>
          </div>
          <div>
            <div className="question-label">
              <label>Choice of drink?</label>
            </div>
            <div className="question-choices-container">
              <div className="question-choices-left">
                <input
                  type="radio"
                  id="choice7"
                  name="question3"
                  value={1}
                  onChange={(e) => setQuestion3(e.target.value)}
                />
                <label for="choice7">Orange Juice</label>
              </div>

              <div className="question-choices">
                <input
                  type="radio"
                  id="choice8"
                  name="question3"
                  value={2}
                  onChange={(e) => setQuestion3(e.target.value)}
                />
                <label for="choice8">Water</label>
              </div>

              <div className="question-choices-right">
                <input
                  type="radio"
                  id="choice9"
                  name="question3"
                  value={3}
                  onChange={(e) => setQuestion3(e.target.value)}
                />
                <label for="choice9">Coke and rum</label>
              </div>
            </div>
          </div>
          <div>
            <div className="question-label">
              <label>How would you spend a million dollars?</label>
            </div>
            <div className="question-choices-container">
              <div className="question-choices-left">
                <input
                  type="radio"
                  id="choice10"
                  name="question4"
                  value={1}
                  onChange={(e) => setQuestion4(e.target.value)}
                />
                <label for="choice10">Donate to charity</label>
              </div>

              <div className="question-choices">
                <input
                  type="radio"
                  id="choice11"
                  name="question4"
                  value={2}
                  onChange={(e) => setQuestion4(e.target.value)}
                />
                <label for="choice11">Friends and family</label>
              </div>

              <div className="question-choices-right">
                <input
                  type="radio"
                  id="choice12"
                  name="question4"
                  value={3}
                  onChange={(e) => setQuestion4(e.target.value)}
                />
                <label for="choice12">Yacht party</label>
              </div>
            </div>
          </div>
          <div>
            <div className="question-label">
              <label>Rom-coms or horror films?</label>
            </div>
            <div className="question-choices-container">
              <div className="question-choices-left">
                <input
                  type="radio"
                  id="choice13"
                  name="question5"
                  value={1}
                  onChange={(e) => setQuestion5(e.target.value)}
                />
                <label for="choice13">Romance for sure</label>
              </div>

              <div className="question-choices">
                <input
                  type="radio"
                  id="choice14"
                  name="question5"
                  value={2}
                  onChange={(e) => setQuestion5(e.target.value)}
                />
                <label for="choice14">Why not both</label>
              </div>

              <div className="question-choices-right">
                <input
                  type="radio"
                  id="choice15"
                  name="question5"
                  value={3}
                  onChange={(e) => setQuestion5(e.target.value)}
                />
                <label for="choice15">Horror only</label>
              </div>
            </div>
          </div>
        </form>
        <div className="submit-personality-questions-container">
          {/* <NavLink
            to={{
              pathname: "/profiles",
            }}
          > */}
          <button onClick={(e) => onSubmit(e)}>Submit</button>
          {/* </NavLink> */}
        </div>
      </div>
    </>
  );
}

export default PersonalityQuestions;
