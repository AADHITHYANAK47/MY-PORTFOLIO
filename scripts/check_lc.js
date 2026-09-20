async function queryLC(user) {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'User-Agent': 'Mozilla/5.0' 
      },
      body: JSON.stringify({
        query: `query getUserProfile($username: String!) { 
          matchedUser(username: $username) { 
            username 
            profile { ranking realName }
            submitStats: submitStatsGlobal { 
              acSubmissionNum { difficulty count } 
            } 
          } 
        }`,
        variables: { username: user }
      })
    });
    const json = await res.json();
    if (json.data && json.data.matchedUser) {
      console.log('FOUND:', user, '->', JSON.stringify(json.data.matchedUser));
    }
  } catch(e) {}
}
async function run() {
  const list = ['aadhi', 'aadhi07', 'aadhithyan_ak', 'aadhithyan_s07', 'aadhithyan_s7', 'aadhithyan_2004', 'aadhithyan_2005', 'aadhithyan_2006', 'aadhithyan_07', 'aadhithyans_07', 'aadhithyan-s'];
  for (const u of list) {
    await queryLC(u);
  }
}
run();
