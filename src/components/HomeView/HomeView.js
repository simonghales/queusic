import * as React from 'react';
import './HomeView.css';
import TilesSection from '../TilesSection/TilesSection';
import ControlsSection from '../ControlsSection/ControlsSection';

export default class HomeView extends React.Component {
  render() {
    return (
      <div className='HomeView'>
        <main className='HomeView__main'>
          <TilesSection/>
        </main>
        <aside className='HomeView__aside'>
          <ControlsSection/>
        </aside>
      </div>
    );
  }
}
