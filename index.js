const express = require('express');
const { gql, GraphQLClient } = require("graphql-request");
// const {Client} = require('get-pinned-repos')
const cors = require('cors');
const app = express()
require('dotenv').config();
app.use(cors({
  origin: '*'
}))
// Client.setToken(process.env.GH_TOKEN);

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

// graphql client

client = new GraphQLClient("https://api.github.com/graphql")
client.setHeader("Authorization", `Bearer ${process.env.GH_TOKEN}`);
const query = gql`
            {
                user(login: "${process.env.GH_UNAME}") {
                    pinnedItems(first: 6, types: REPOSITORY) {
                        nodes {
                            ... on Repository {
                                name
                                url
                                description
                                homepageUrl
                            }
                        }
                    }
                }
            }
        `;



app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})
//get projects
app.get("/projects", async (req, res) => {
    const repos = await client.request(query)
    // console.log(repos.user.pinnedItems.nodes)
    res.send(repos.user.pinnedItems.nodes)
})

app.listen(3000, () => {console.log("connected")})