/* React tinder card style
https://www.npmjs.com/package/react-tinder-card
https://github.com/3DJakob/react-tinder-card
Card code snippet: https://github.com/3DJakob/react-tinder-card-demo
*/

import TinderCard from 'react-tinder-card';
import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Dashboard = () => {
	const [user, setUser] = useState(null);
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [LastDirection, setLastDirection] = useState()
	const [genderedUsers, setGenderedUsers] = useState(null);

	const userId = cookies.UserId

	const getUser = async () => {
		try {
			const response = await axios.get("http://localhost:8000/user", {
				params: { userId }
			})
			setUser(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	const getGenderedUsers = async () => {
		try {
			const response = await axios.get("http://localhost:8000/gendered-users", {
				params: { gender: user?.gender_interest }
		})
		setGenderedUsers(response.data)
	} catch (error) {
		console.error(error)
	}
	}
				
	useEffect(() => {
		getUser()
	}, [])

	useEffect(() => {
		if (user) {getGenderedUsers()}
	}, [user])

	const updateMatches = async (matchedUserId) => {
		try {
			await axios.put("http://localhost:8000/addmatch", {
				userId,
				matchedUserId
			})
			getUser()
		} catch (error) {
			console.error(error)
		}
	}

	console.log("DDDuser", user)

    const swiped = (direction, swipedUserId) => {
        if (direction === "right") {
			updateMatches(swipedUserId)
			getUser()
		}
        setLastDirection(direction)
	}
    
    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

	const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId)

	const filteredUsers = genderedUsers?.filter(
		genderedUser => !matchedUserIds.includes(genderedUser.user_id)
	)
    
    return (
		<>
		{user &&
			<div className="dashboard">
				<ChatContainer user={user}/>
				<div className="swipe-container">
					<div className="card-container">
						{filteredUsers?.map((genderedUser) =>
							<TinderCard 
							className='swipe'
							key={genderedUser.user_id}
							onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
							onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
								<div style={{ backgroundImage: 'url(' + genderedUser.url + ')' }} 
								className='card'>
									<h3>{genderedUser.first_name}</h3>
								</div>
							</TinderCard>
						)}
						<div className="swipe-info">
							{LastDirection ? <p>Swiped {LastDirection}</p> : <p/>}
						</div>
					</div>
				</div>
			</div>}
		</>
    );
}

export default Dashboard;