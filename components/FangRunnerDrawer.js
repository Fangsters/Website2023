import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FangBtn } from './FangBtn';

function FangRunner({ fangRunnerActive, handleToggleFangRunnerDrawer, isConnected = false }) {
  const ratio = 0.566;
  const [style, setStyle] = useState({});

  useEffect(() => {
    window.addEventListener('resize', resize);
    resize();
  }, []);

  function resize() {
    console.log('resize');

    let margin = 100;
    if (window.innerWidth < 800) {
      margin = 0;
    }

    let width = window.innerWidth - margin;
    let height = ratio * (window.innerWidth - margin);

    if (height > window.innerHeight - 120) {
      height = window.innerHeight - 120;
      width = height / ratio;
    }

    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'scroll';
  }

  useEffect(() => {
    setTimeout(() => {
      fangRunnerActive ? document.getElementById('game-drop-down').scrollIntoView({ behavior: 'smooth' }) : null;
      let gameFrame = document.getElementById('game-frame');
      if (fangRunnerActive) {
        if (gameFrame) gameFrame.muted = false;
      } else {
        if (gameFrame) gameFrame.muted = true;
      }
    }, 1000);
  }, [fangRunnerActive]);

  return (
    <div id="game-drop-down" className={fangRunnerActive ? 'droppingDown' : 'closingUp'}>
      <div className="drawer-x-btn" onClick={() => handleToggleFangRunnerDrawer()}>
        <Image src="/images/menu-x.svg" width={25} height={25} />
      </div>
      {/*       <div className="drawer-link-btn" onClick={() => handleToggleFangRunnerDrawer()}>
        <Image src="/images/ArrowTopRightOnSquare.svg" width={25} height={25} />
      </div> */}
      <h3>PLAY FANGRUNNER.</h3>
      <div className="game-container">
        <FangBtn
          label={'PLAY'}
          extraClasses="play-button center-btn"
          passedFunction={() => {
            window.open('/fangrunnergame/index.html', '_blank');
          }}
        />
      </div>
      <p>Run your way through New Fang City while avoiding flippers and paper hands to collect as many precious diamonds as possible!</p>
      <p>By holding a Fangster you start your run with a shield power up. Stay on the look out for Fang Runner competitions during celebrations and other events.</p>
      <br></br>
      <img className="pxl-arrow" src="./images/pxlfangarrow.png" width="103px" height="69px" onClick={() => handleToggleFangRunnerDrawer()} />
    </div>
  );
}

export default FangRunner;
