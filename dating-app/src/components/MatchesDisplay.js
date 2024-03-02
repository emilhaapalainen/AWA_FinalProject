import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

const MatchesDisplay = ({ matches, setClickedUser }) => {
    const [ matchedProfiles, setMatchedProfiles ] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(null);

    console.log("MATCHES", matches)
    const matchedIds = matches.map(({ user_id }) => user_id)
    const userId = cookies.UserId;
    

    const getMatches = async () => {
        try {
            const response = await axios.get("http://localhost:8000/users", {
                params: { userIds: JSON.stringify(matchedIds) },
            })
            console.log("response", response)
            setMatchedProfiles(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getMatches()
    }, [])

    console.log("matchedProfiles:", matchedProfiles)

    return (
        <div className="matches-display">
            {matchedProfiles?.map((match, _index) => (
                <div key={_index} className="match-card" onClick={() => setClickedUser(match)}>
                    <div classname="img-container">
                        <img src={match?.url} alt={match?.first_name}/>
                    </div>
                    <h3>{match?.first_name}</h3>
                </div>
                    
            ))}


        </div>
    );
}

export default MatchesDisplay;