import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProfiles, fetchSingleProfile } from "../../store/profile";
import { NavLink } from "react-router-dom";
import "./Profiles.css";
import {
  getProfileMatches,
  getProfileMatchPercentage,
} from "../../store/match";


function Profile() {
  const userProfiles = useSelector((state) => state.profiles.user_profiles);
  const currentUserId = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();

  const [matches, setMatches] = useState(false);
  class Card {
    constructor({
      imageUrl,
      onDismiss,
      onLike,
      onDislike
    }) {
      this.imageUrl = imageUrl;
      this.onDismiss = onDismiss;
      this.onLike = onLike;
      this.onDislike = onDislike;
      this.init();
    }
  }
  let startPoint;
  let offsetX;
  let offsetY;

  const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  }

  const init = () => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = this.imageUrl;
    card.append(img);
    this.element = card;
    if (this.isTouchDevice()) {
      this.listenToTouchEvents();
    } else {
      this.listenToMouseEvents();
    }
  }

  const listenToTouchEvents = () => {
    this.element.addEventListener('touchstart', (e) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.startPoint = { x: clientX, y: clientY }
      document.addEventListener('touchmove', this.handleTouchMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('touchend', this.handleTouchEnd);
    document.addEventListener('cancel', this.handleTouchEnd);
  }

  const listenToMouseEvents = () => {
    this.element.addEventListener('mousedown', (e) => {
      const { clientX, clientY } = e;
      this.startPoint = { x: clientX, y: clientY }
      document.addEventListener('mousemove', this.handleMouseMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('mouseup', this.handleMoveUp);

    // prevent card from being dragged
    this.element.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  }

  const handleMove = (x, y) => {
    this.offsetX = x - this.startPoint.x;
    this.offsetY = y - this.startPoint.y;
    const rotate = this.offsetX * 0.1;
    this.element.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) rotate(${rotate}deg)`;
    // dismiss card
    if (Math.abs(this.offsetX) > this.element.clientWidth * 0.7) {
      this.dismiss(this.offsetX > 0 ? 1 : -1);
    }
  }

  // mouse event handlers
  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!this.startPoint) return;
    const { clientX, clientY } = e;
    this.handleMove(clientX, clientY);
  }

  const handleMoveUp = () => {
    this.startPoint = null;
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.element.style.transform = '';
  }

  // touch event handlers
  const handleTouchMove = (e) => {
    if (!this.startPoint) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const { clientX, clientY } = touch;
    this.handleMove(clientX, clientY);
  }

  const handleTouchEnd = () => {
    this.startPoint = null;
    document.removeEventListener('touchmove', this.handleTouchMove);
    this.element.style.transform = '';
  }

  const dismiss = (direction) => {
    this.startPoint = null;
    document.removeEventListener('mouseup', this.handleMoveUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('touchmove', this.handleTouchMove);
    this.element.style.transition = 'transform 1s';
    this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.offsetY}px) rotate(${90 * direction}deg)`;
    this.element.classList.add('dismissing');
    setTimeout(() => {
      this.element.remove();
    }, 1000);
    if (typeof this.onDismiss === 'function') {
      this.onDismiss();
    }
    if (typeof this.onLike === 'function' && direction === 1) {
      this.onLike();
    }
    if (typeof this.onDislike === 'function' && direction === -1) {
      this.onDislike();
    }
  }
  const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

// constants
const urls = [
  'https://source.unsplash.com/random/1000x1000/?sky',
  'https://source.unsplash.com/random/1000x1000/?landscape',
  'https://source.unsplash.com/random/1000x1000/?ocean',
  'https://source.unsplash.com/random/1000x1000/?moutain',
  'https://source.unsplash.com/random/1000x1000/?forest'
];

// variables
let cardCount = 0;

// functions
function appendNewCard() {
  const card = new Card({
    imageUrl: urls[cardCount % 5],
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
    }
  });
  swiper.append(card.element);
  cardCount++;

  const cards = swiper.querySelectorAll('.card:not(.dismissing)');
  cards.forEach((card, index) => {
    card.style.setProperty('--i', index);
  });
}

// first 5 cards
for (let i = 0; i < 5; i++) {
  appendNewCard();
}

  useEffect(() => {
    dispatch(fetchAllProfiles());
    dispatch(getProfileMatchPercentage());
    dispatch(getProfileMatches());
  }, []);

  let userProfilesArray = [];
  for (const profile in userProfiles) {
    userProfilesArray.push(userProfiles[profile]);
  }

  const calculateAge = (birthday) => {
    const [month, day, year] = birthday.split("-");
    const birthdate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    let years = today.getFullYear() - year;

    if (
      today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() == birthdate.getMonth() &&
        today.getDate() < birthdate.getDate())
    ) {
      years--;
    }
    return years;
  };

  return (
    <>
      <div className="entire-profiles-page">
        <div className="main-profiles-page-container">
          <div className="inner-profiles-container">
            {userProfiles &&
              userProfilesArray.map(
                (profile) =>
                  profile.user_id !== currentUserId && (
                    <div className="profile-box" key={profile.id}>
                      <div className="profile-box-content">
                        <img src={profile.img_url1}></img>
                        <NavLink
                          // onClick={async (e) => {
                          //   await dispatch(fetchSingleProfile(profile.id));
                          // }}
                          to={{
                            pathname: `/profile/${profile.id}`,
                          }}
                          style={{
                            textDecoration: "none",
                            color: "rgb(00, 82, 94)",
                          }}
                        >
                          <h3>{profile.first_name}</h3>
                        </NavLink>
                        <div className="profile-box-sub-content">
                          <div>
                            {profile.location} •{" "}
                            {calculateAge(profile.birthday)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
