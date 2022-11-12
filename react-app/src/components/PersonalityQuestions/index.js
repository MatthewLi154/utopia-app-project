import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./PersonalityQuesitons.css";

function PersonalityQuestions() {
  const { userId } = useParams();

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
                <input type="radio" id="choice1" name="question1" value="1" />
                <label for="choice1">Stay home</label>
              </div>

              <div className="question-choices">
                <input type="radio" id="choice2" name="question1" value="5" />
                <label for="choice2">Not sure</label>
              </div>

              <div className="question-choices-right">
                <input type="radio" id="choice3" name="question1" value="10" />
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
                  value="1"
                  onselect=""
                />
                <label for="choice4">Dependable</label>
              </div>

              <div className="question-choices">
                <input type="radio" id="choice5" name="question2" value="5" />
                <label for="choice5">A normie</label>
              </div>

              <div className="question-choices-right">
                <input type="radio" id="choice6" name="question2" value="10" />
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
                <input type="radio" id="choice7" name="question3" value="1" />
                <label for="choice7">Orange Juice</label>
              </div>

              <div className="question-choices">
                <input type="radio" id="choice8" name="question3" value="5" />
                <label for="choice8">Water</label>
              </div>

              <div className="question-choices-right">
                <input type="radio" id="choice9" name="question3" value="10" />
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
                <input type="radio" id="choice10" name="question4" value="1" />
                <label for="choice10">Donate to charity</label>
              </div>

              <div className="question-choices">
                <input type="radio" id="choice11" name="question4" value="5" />
                <label for="choice11">Friends and family</label>
              </div>

              <div className="question-choices-right">
                <input type="radio" id="choice12" name="question4" value="10" />
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
                <input type="radio" id="choice13" name="question5" value={1} />
                <label for="choice13">Romance for sure</label>
              </div>

              <div className="question-choices">
                <input type="radio" id="choice14" name="question5" value={5} />
                <label for="choice14">Why not both</label>
              </div>

              <div className="question-choices-right">
                <input type="radio" id="choice15" name="question5" value={10} />
                <label for="choice15">Horror only</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default PersonalityQuestions;
