/* React tinder card style
https://www.npmjs.com/package/react-tinder-card
https://github.com/3DJakob/react-tinder-card
Card code snippet: https://github.com/3DJakob/react-tinder-card-demo
*/

import TinderCard from 'react-tinder-card';
import { useState } from 'react';
import ChatContainer from '../components/ChatContainer';

const Dashboard = () => {

    const characters = [
        {
          name: 'Richard Hendricks',
          url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
          name: 'Erlich Bachman',
          url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
          name: 'Monica Hall',
          url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
          name: 'Jared Dunn',
          url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
          name: 'Dinesh Chugtai',
          url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }
      ]
      
    const [LastDirection, setLastDirection] = useState()
    
    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
      }
    
      const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
      }
    
    return (
        <div className="dashboard">
            <ChatContainer/>
            <div className="swipe-container">
                <div className="card-container">
                    {characters.map((character) =>
                        <TinderCard 
                        className='swipe'
                        key={character.name}
                        onSwipe={(dir) => swiped(dir, character.name)}
                        onCardLeftScreen={() => outOfFrame(character.name)}>
                            <div style={{ backgroundImage: 'url(' + character.url + ')' }} 
                            className='card'>
                                <h3>{character.name}</h3>
                            </div>
                        </TinderCard>
                    )}
                    <div className="swipe-info">
                        {LastDirection ? <p>Swiped {LastDirection}</p> : <p/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;