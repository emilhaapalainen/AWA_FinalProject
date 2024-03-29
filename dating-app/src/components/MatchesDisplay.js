import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

const MatchesDisplay = ({ matches, setClickedUser }) => {
    const [ matchedProfiles, setMatchedProfiles ] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(null);

    const matchedIds = matches.map(({ user_id }) => user_id)
    const userId = cookies.UserId;

    const getMatches = async () => {
        try {
            const response = await axios.get("http://localhost:8000/users", {
                params: { userIds: JSON.stringify(matchedIds) },
            })
            setMatchedProfiles(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getMatches()
    }, [matches])

    // Only allow chatting with users who have BOTH matched
    const isMatched = matchedProfiles?.filter((matchedProfile) => matchedProfile.matches.filter((profile) => profile.user_id == userId).length > 0)

    return (
        <div className="matches-display">
            {isMatched?.map((match, _index) => (
                <div key={match.user_id} className="match-card" onClick={() => setClickedUser(match)}>
                    <div className="img-container">
                        <img src={match?.url} alt={match?.first_name}/>
                    </div>
                    <h3>{match?.first_name}</h3>
                </div>
                    
            ))}


        </div>
    );
}

export default MatchesDisplay;