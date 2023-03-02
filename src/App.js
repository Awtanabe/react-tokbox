import logo from './logo.svg';
import './App.css';
import React,{ useState, useEffect} from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } from 'opentok-react';
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import styles from 'styled-components';

const Container = styles.div`
  width: 800px;
  margin: 0 auto;
  padding-top: 100px;
`

function App() {
  const [ streams, setStreams ] = useState([])
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    if(!session) {
      const sessionHelper = createSession({
        apiKey: process.env.REACT_APP_TOKBOX_API_KEY,
        sessionId: process.env.REACT_APP_TOKBOX_SESSION_ID,
        token: process.env.REACT_APP_TOKBOX_TOKEN,
        onStreamsUpdated: streams => setStreams(streams[0])
      })
      setSession(sessionHelper)
  
    }
  })

  useEffect(
    () => () => {
      if (session) {
        session.disconnect();
      }
    },
    [session],
  );

    return (
      <Container>
        {session && (
        <OTSession
        apiKey={process.env.REACT_APP_TOKBOX_API_KEY}
        sessionId={process.env.REACT_APP_TOKBOX_SESSION_ID}
        token={process.env.REACT_APP_TOKBOX_TOKEN}
      >
        <OTPublisher
        session={session.session}
        properties={{  width: 700, height: 500}}
        />
        <OTStreams>
            <OTSubscriber
              properties={{ showControls: false, insertMode: 'append' }}
              session={session.session}
              stream={streams}
            />
        </OTStreams>
      </OTSession>
        )}
      </Container>

    )
}

export default App