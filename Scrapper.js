
const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
titres=['.headline', '.article-header','.e1nh2i2l5', '.heading-tag-switch.h2','.fs-headline', '.ArticleHeader-headline','.article-hero-headline__htag','.caas-title-wrapper']
arts=['.cli-text', '.wysiwyg--all-content','.rich-text-article-body','.e5tfeyi1', '.mol-para-with-font', '.article-topline','.ArticleBody-articleBody','.article-body__content','.article-body','.caas-body']

//const url = 'https://www.huffpost.com/entry/james-caan-death-cause-heart-attack-coronary-artery-disease_n_62dcb254e4b0a6852c387fb8'
//const url = 'https://www.latimes.com/california/story/2022-07-23/wildfire-north-of-mariposa-marks-ominous-start-to-california-wildfire-season'
//const url = 'https://www.aljazeera.com/news/2022/7/24/russia-attack-ukrainian-port-odesa-military-targets'
//const url = 'https://www.bbc.com/news/world-middle-east-62284377'
//const url = 'https://www.dailymail.co.uk/news/article-11043983/Father-four-35-fighting-life-hospital-stabbed-stag-Portugal.html'
//const url = 'https://www.forbes.com/sites/carlieporterfield/2022/07/24/elon-musk-reportedly-had-affair-with-sergey-brins-wife-ending-billionaires-friendship/?sh=3e8f013e2433'
//const url = 'https://www.cnbc.com/2022/07/24/outraged-by-odesa-strike-ukraine-still-prepares-to-resume-grain-exports.html'
//const url = 'https://www.nbcnews.com/politics/congress/jan-6-panel-will-weigh-subpoenaing-ginni-thomas-needed-cheney-says-rcna39735'
//const url = 'https://www.foxnews.com/politics/trump-dominates-2024-gop-presidential-nomination-straw-poll-turning-point-usa-summit'
//const url = 'https://news.yahoo.com/greenland-hit-unusually-extensive-melting-110053363.html'

switch (true) {
    case url.includes("https://www.huffpost.com/"):
        titre=titres[0]
        art=arts[0]
    break;
    case url.includes("https://www.aljazeera.com/"):
        titre=titres[1]
        art=arts[1]
    break;
    case url.includes("https://www.latimes.com/"):
        titre=titres[0]
        art=arts[2]
    break;
    case url.includes("https://www.bbc.com/"):
        titre=titres[2]
        art=arts[3]
    break;
    case url.includes("https://www.dailymail.co.uk/"):
        titre=titres[3]
        art=arts[4]
    break;
    case url.includes("https://www.forbes.com/"):
        titre=titres[4]
        art=arts[5]
    break;
    case url.includes("https://www.cnbc.com/"):
    titre=titres[5]
    art=arts[6]
break;
case url.includes("https://www.nbcnews.com/"):
    titre=titres[6]
    art=arts[7]
break;
case url.includes("https://www.foxnews.com/"):
    titre=titres[1]
    art=arts[8]
break;
case url.includes("https://news.yahoo.com/"):
    titre=titres[7]
    art=arts[9]
break;
    default:
      console.log(`Sorry, we are not providing the service for this website.`);
  }





app.get('/', function (req, res) {
    res.json('This is my webscraper')
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const titles = []
            const contents = []


            $(titre, html).each(function () { //<-- cannot be a function expression
                const title = $(this).text()
                titles.push({
                    title
                    
                })
            })

                $(art, html).each(function () { //<-- cannot be a function expression
                    const content = $(this).text()
                    contents.push({
                         content
                })
            })
            const articles = titles.concat(contents)
            res.json(articles)
        }).catch(err => console.log(err))

})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))