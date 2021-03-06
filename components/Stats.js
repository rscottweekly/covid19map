// import { useState } from "react";
import styled, { css } from "styled-components";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { dailyCases } from "../data/static";

const Stats = ({ data, caseDetails, casesPer1M, onViewChange, children }) => {
  const {
    confirmedCases,
    probableCases,
    recoveredCases,
    alertLevel,
    deaths,
    // comTrans,
    countriesAffected,
    inHospital
  } = data.staticData;
  const totalCases = confirmedCases + probableCases;

  const newCases =
    dailyCases[dailyCases.length - 1].cases -
    dailyCases[dailyCases.length - 2].cases;

  const { lastUpdated, locations } = data;
  const recoveryRate = Math.round((recoveredCases / totalCases) * 100);

  const {
    countMale,
    countFemale,
    countOther,
    ages: ageData,
    totalCasesPublished
  } = caseDetails;

  const percentWomen = Math.round((countFemale / totalCasesPublished) * 100);
  const percentMen = Math.round((countMale / totalCasesPublished) * 100);

  const top5inNZ = locations.slice(0, 5);

  // const [currentAgeIndex, setcurrentAgeIndex] = useState(0);
  return (
    <div className="container">
      <Infographic>
        {/* <Header>
          <button type="button" className="view-map" onClick={onViewChange}>
            <img src="/infographic/backtomap.svg" />
            View Live Map
          </button>
          <div className="date">{lastUpdated}</div>
        </Header>

        <Logo>
          <img className="logo" src="/logo.svg" />
          <div>
            <h1>Covid-19 Map</h1>
          </div>
        </Logo>

        <div className="date-mobile">{lastUpdated}</div> */}
        <Row>
          <Total>
            <h1>
              Total cases <br />
              in New Zealand
            </h1>
            <TotalNumber num={totalCases}>
              {totalCases
                .toString()
                .split("")
                .map((digit, i) => (
                  <span key={i}>{digit}</span>
                ))}
            </TotalNumber>
          </Total>
          {/* <div>
            <Alert>
              <div className="head" />
              <div className="body">
                Alert level<div>{alertLevel}</div>
              </div>
            </Alert>
          </div> */}
        </Row>
        <Row>
          <Cases>
            <div>
              <strong>{confirmedCases}</strong> Confirmed Cases
            </div>
            <div>
              <strong>{probableCases}</strong> Probable Cases
            </div>
          </Cases>
        </Row>
        <Row>
          <div className="grid">
            <NewCases>
              <strong>+{newCases}</strong> New cases
              <br />
              in the last
              <br />
              24 hours
              <img src="/infographic/nznewcases.svg" />
            </NewCases>
            <Deaths count={deaths}>
              <strong>{deaths}</strong>
              <span>Deaths</span>
            </Deaths>
          </div>
        </Row>
        <Row>
          <Recovered>
            <div>
              <strong>{recoveredCases}</strong> Recovered
            </div>
            <div>
              Recovery
              <br />
              Rate
              <br />
              <strong>{recoveryRate}%</strong>
            </div>
            <div>
              <People percent={recoveryRate} />
            </div>
          </Recovered>
        </Row>
        <Row>
          <div className="grid">
            <Hospital>
              <div className="head">
                <strong>{inHospital}</strong>
                <span>
                  Cases in
                  <br /> hospital
                </span>
              </div>
              <img src="/infographic/hospital.svg" />
            </Hospital>

            <Genders>
              <div className="head">Patient genders</div>
              <div className="genders">
                <div className="female">
                  <div>
                    <strong>{percentWomen}</strong> women
                  </div>
                  <img src="/infographic/female.svg" />
                </div>
                <div className="male">
                  <div>
                    <strong>{percentMen}</strong> men
                  </div>
                  <img src="/infographic/male.svg" />
                </div>
              </div>
              {/* <div className="foot">
                {countMale !== countFemale && (
                  <>
                    More{" "}
                    <strong>
                      {countMale > countFemale ? "males" : "females"}
                    </strong>{" "}
                    have been infected
                  </>
                )}
              </div> */}
            </Genders>

            {/* <Transmissions>
              <strong>{comTrans}</strong>
              Cases of <br />
              community <br />
              transmission
              <img src="/infographic/commtrans.svg" />
            </Transmissions> */}

            {/* <Soap>
              <img src="/infographic/Washhands.svg" />
            </Soap> */}
          </div>

          <Chart>
            <div className="head">COVID-19 cases in New Zealand</div>
            <div className="chart-wrap">
              <ResponsiveContainer>
                <LineChart
                  data={dailyCases}
                  margin={{ left: -30, right: 10, bottom: 20 }}
                >
                  <XAxis
                    dataKey="days"
                    label={{
                      fontSize: 12,
                      value: "Days since first case detected",
                      position: "bottom"
                    }}
                  />
                  <YAxis
                  // label={{
                  //   value: "Cases",
                  //   position: "left",
                  //   offset: -10,
                  //   angle: -90
                  // }}
                  />
                  {/* <Tooltip /> */}
                  {/* <Legend /> */}
                  <Line
                    type="monotone"
                    dataKey="cases"
                    stroke="#51b6b0"
                    strokeWidth={4}
                    dot={false}
                    // activeDot={{ r: 8 }}
                  />
                  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Chart>
        </Row>
        <Row>{children}</Row>
        <Row>
          <Ages>
            <div className="head">Age Groups</div>
            <div className="chart">
              {ageData.map((item, i) => {
                const percent = Math.round(
                  (item.numCases / totalCasesPublished) * 100
                );
                return (
                  <Age
                    key={i}
                    percent={percent}
                    // onMouseOver={() => setcurrentAgeIndex(i)}
                  >
                    {item.title}
                    <strong>{percent || 1}%</strong>
                  </Age>
                );
              })}
            </div>
            {/* <div className="foot">
              {currentAgeIndex !== null && (
                <>
                  <strong>{ageData[currentAgeIndex].title}:</strong>{" "}
                  {ageData[currentAgeIndex].numCases} confirmed{" "}
                  {ageData[currentAgeIndex].numCases === 1 ? "case" : "cases"}
                </>
              )}
              &nbsp;
            </div> */}
          </Ages>
        </Row>
        <Row>
          {/* <Globe>
            <div className="globe">
              <img src="/infographic/world.svg" />
              <div className="text">
                <strong>{countriesAffected}</strong>
                Countries
                <br />
                Affected
              </div>
            </div>
            <img className="mag" src="/infographic/magnifyingglass.svg" />
          </Globe> */}

          <Ranking>
            <div className="head">Total cases per 1m population</div>
            {casesPer1M.map((item, i) => (
              <div key={i} className="country">
                <div className="count">{item.numCases}</div>
                <div className="title">{item.title}</div>
              </div>
            ))}
          </Ranking>
          {/* <Clipboard>
            <div>
              <img src="/infographic/clipboard.svg" />
              <div className="head">
                Top 5 NZ
                <br /> affected
                <br /> areas
              </div>
              {top5inNZ.map((item, i) => (
                <div key={i} className="location">
                  <div>
                    <div className="count">{item.totalCases}</div>
                  </div>{" "}
                  {item.location}
                </div>
              ))}
            </div>
          </Clipboard> */}
        </Row>
        {/* <Footer>
          <div className="head">Sources:</div>
          <a
            href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ministry of Health
          </a>
          <br />
          <a
            href="https://github.com/CSSEGISandData/COVID-19"
            target="_blank"
            rel="noopener noreferrer"
          >
            Johns Hopkins University CSSE
          </a>

          <button type="button" className="view-map" onClick={onViewChange}>
            <img src="/infographic/backtomap.svg" /> View <br />
            Live Map
          </button>
          <img src="/infographic/sth.svg" />
        </Footer> */}
      </Infographic>
    </div>
  );
};

export default Stats;

const Infographic = styled.div`
  ${({ theme, ...props }) => css`
    font-size: 2vw;
    

    /* background: #d9f4f3; */
@media (min-width: ${theme.sm}) {
  font-size: .45em;
}

    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          font-size: 1vw;
        }
      `}

    /* .sub-row {
      display: flex;
      margin-top: 2em;
      margin-bottom: 2em;
      ${props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            margin-bottom: 0;
          }
        `}
    }
    .flex-1 {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    } */

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      /* grid-template-rows: 1fr 1fr; */
      grid-gap: 0em 2em;
      margin: 2em 0;
      ${props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            margin: 0;
            grid-gap: 0;
          }
        `}
    }

    .date-mobile {
      margin-left: 2.5em;
      ${props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            display: none;
          }
        `}
    }

  `}
`;

const Header = styled.div`
  ${({ theme, ...props }) => css`
    color: white;
    padding: 0 2.5em;
    /* height: 2.5em; */
    display: flex;
    align-items: center;
    background: ${theme.navy};
    position: relative;
    .view-map {
      border: none;
      /* position: absolute; */
      /* top: 0;
      left: 1.7em; */
      /* display: block; */
      color: white;
      background: none;
      /* background: ${theme.yellow}; */
      padding: .5em 0;
      font-size: 1.5em;
      border-radius: 0 0 0.25em 0.25em;
      line-height: 1.2;
      display: inline-flex;
      align-items: center;
      font-size: 2em;
      ${props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            font-size: 1.5em;
          }
        `}
      
      img {
        width: 1.1em;
        margin-right: 0.5em;
        vertical-align: center;
      }
    }
    .date {
      display: none;
      font-size: 1.2em;
      width: 30em;
      text-align: right;
      margin-left: 20em;
      ${props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            display: block;
          }
        `}
    }
  `}
`;

const Row = styled.div`
  ${({ theme, ...props }) => css`
    /* padding: 0 2em; */
    margin: 2em 0 0;
    justify-content: space-between;
    > div {
      margin-top: 0.7em;
      margin-bottom: 0.7em;
    }
    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          display: flex;
          padding: 0 2.5em;
          > div {
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      `}
    .flex-mobile {
      display: flex;
      justify-content: space-between;
      align-items: center;

      ${props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
          }
        `}
    }
  `}
`;

const Total = styled.div`
  ${({ theme, ...props }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.99em;
    /* padding-top: 14em; */
    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          padding-top: 0;
          margin-right: 16em;
          font-size: 1.45em;
        }
      `}
    h1 {
      white-space: nowrap;
      font-weight: normal;
      margin: 0 1em 0 0;
      font-size: 3em;
      font-family: ${theme.fontFancy};
      color: ${theme.teal};
      text-transform: uppercase;
      line-height: 1.1;
    }
  `}
`;

const TotalNumber = styled.div`
  ${({ theme, num, ...props }) => css`
    display: flex;
    color: ${theme.green};
    font-size: 5.3em;
    ${num > 999 &&
      css`
        font-size: 4.5em;
      `}

    span {
      background: white;
      display: inline-block;
      border-radius: 0.1em;
      padding: 0.1em 0.12em;
      margin: 0.03em;
      font-weight: bold;
      line-height: 1;
    }
    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          font-size: 6em;
        }
      `}
  `}
`;

const Alert = styled.div`
  ${({ theme, ...props }) => css`
    width: 21em;
    background: #fff1c1;
    position: absolute;
    top: 0;
    right: 5em;
    font-size: 0.6em;
    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          font-size: 1em;
          right: 2.5em;
        }
      `}

    .head {
      height: 3em;
      background: url(/infographic/alertlevel.svg) no-repeat;
      background-size: cover;
    }
    .body {
      display: grid;
      grid-template-columns: 2fr auto;
      grid-gap: 0 0.5em;
      align-items: center;
      line-height: 1.1;
      color: ${theme.yellow};
      font-size: 3em;
      font-family: ${theme.fontFancy};
      font-weight: normal;
      text-transform: uppercase;
      padding: 0.5em;
      div {
        font-family: ${theme.font};
        font-weight: bold;
        font-size: 3em;
      }
    }
  `}
`;

const Cases = styled.div`
  ${({ theme, ...props }) => css`
    background: #a6e5e3;
    border-radius: 0.3em;
    padding: 0.5em 1em 0.5em 4.4em;
    font-size: 2.8em;
    color: ${theme.dark};
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    :before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0.7em;
      width: 3em;
      height: 3em;
      background: url(/infographic/cases.svg) center center no-repeat;
      background-size: contain;
      transform: translateY(-50%);
    }
    strong {
      color: ${theme.teal};
      display: inline-block;
      min-width: 2em;
    }
  `}
`;

const Recovered = styled.div`
  ${({ theme, ...props }) => css`
    flex: 1;
    background: ${theme.green};
    font-size: 2.2em;
    border-radius: 0.3em;
    color: ${theme.dark};
    display: grid;
    grid-template-columns: 1fr 0.8fr auto;
    grid-gap: 0 0.6em;
    align-items: center;
    justify-content: space-between;
    padding: 0.5em 1em;
    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          margin: 0 0 0 1em;
        }
      `}
    > div:first-child {
      border-right: solid ${theme.dark} 0.1em;
      padding-right: 0.6em;
      strong {
        display: block;
        line-height: 1;
        font-size: 2.3em;
        color: white;
      }
    }
    > div:nth-child(2) {
      font-size: 0.8em;
      line-height: 1;
      strong {
        margin-top: 0.2em;
        display: block;
        line-height: 1;
        font-size: 1.9em;
        color: white;
      }
    }
    > div:last-child {
      display: flex;
      flex-wrap: wrap;
    }
  `}
`;

const People = ({ percent }) => {
  const peopleToFill = Math.floor(percent / 10);
  const partPersonToFill = (percent % 10) / 10;
  return (
    <>
      {[...Array(10)].map((item, i) => {
        let fill;
        if (i === peopleToFill) {
          fill = partPersonToFill;
        } else if (i < peopleToFill) {
          fill = 1;
        } else {
          fill = 0;
        }
        // console.log(fill);
        return (
          <Person key={i} fill={fill}>
            <div
              dangerouslySetInnerHTML={{
                __html: require(`../public/infographic/person.svg?include`)
              }}
            />
          </Person>
        );
      })}
    </>
  );
};

const Person = styled.div`
  ${({ theme, fill }) => css`
    display: inline;
    width: 18%;
    margin: 0.06em;
    position: relative;
    svg {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;

      display: block;
      rect {
        y: ${16.8 - 16.8 * fill};
      }
    }
  `}
`;

const Deaths = styled.div`
  ${({ theme, ...props }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${theme.dark};
    height: 13em;
    width: 13em;
    border-radius: 50%;
    margin: 2em 0 0 8em;
    line-height: 1;
    strong {
      font-size: 6em;
      display: block;
      color: white;
      ${props.count > 99 && css``}
    }
    span {
      color: ${theme.green};
      font-size: 2em;
    }
  `}
`;

const NewCases = styled.div`
  ${({ theme, ...props }) => css`
    font-family: ${theme.fontFancy};
    font-size: 2.4em;
    text-transform: uppercase;
    color: ${theme.dark};
    line-height: 1.1;
    position: relative;
    strong {
      display: block;
      font-size: 3em;
      color: ${theme.green};
      margin-bottom: 0.1em;
    }
    img {
      width: 5em;
      position: absolute;
      top: 0.5em;
      left: 7em;
    }
  `}
`;

const Transmissions = styled.div`
  ${({ theme, ...props }) => css`
    padding: 2em 1.3em 1.3em;
    background: white;
    border-radius: 0.4em;
    font-family: ${theme.fontFancy};
    font-size: 1.9em;
    text-transform: uppercase;
    color: ${theme.dark};
    line-height: 1.1;
    position: relative;
    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          margin-top: 2em;
        }
      `}
    strong {
      display: block;
      font-size: 3em;
      color: ${theme.yellow};
      margin-bottom: 0.1em;
    }
    img {
      width: 6em;
      position: absolute;
      top: 0.5em;
      left: 3.9em;
    }
  `}
`;

const Genders = styled.div`
  ${({ theme, ...props }) => css`
    color: ${theme.dark};
    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          /* font-size: 6em; */
          margin: 0 3.5em 1.2em;
        }
      `}
    .head {
      white-space: nowrap;
      font-family: ${theme.fontFancy};
      font-size: 2em;
      text-transform: uppercase;
      margin-bottom: 0.3em;
    }
    .genders {
      display: flex;
    }
    .female,
    .male {
      position: relative;
      div {
        position: absolute;
        font-size: 1.5em;
        color: white;
        text-align: center;
        line-height: 1.1;
      }
      strong {
        display: block;
        font-size: 1.9em;
        font-family: ${theme.fontFancy};
        :after {
          content: "%";
          font-size: 0.6em;
          position: relative;
          top: -0.5em;
          left: 0.1em;
        }
      }
    }
    .female {
      margin-right: 2em;
      div {
        top: 1.4em;
        left: 1em;
      }
      img {
        height: 13.5em;
      }
    }
    .male {
      div {
        top: 3.2em;
        left: 0.8em;
      }
      img {
        width: 11em;
      }
    }
    .foot {
      font-size: 1.5em;
      strong {
        font-weight: normal;
        color: ${theme.teal};
      }
    }
  `}
`;

const Soap = styled.div`
  ${({ theme, ...props }) => css`
    margin-left: auto;
    text-align: right;
    /* position: relative; */
    /* left: 2em; */
    /* 
    @media (min-width: ${theme.sm}) {
    } 
    */
    img {
      margin-top: 2em;
      width: 23em;
    }
  `}
`;

const Chart = styled.div`
  ${({ theme, ...props }) => css`
    background: white;
    border-radius: 0.5em;
    padding: 2.5em 2em;
    .head {
      text-align: center;
      color: ${theme.dark};
      font-family: ${theme.fontFancy};
      font-size: 2.1em;
      text-transform: uppercase;
      margin-bottom: 1.2em;
      line-height: 1.1;
    }
    .chart-wrap {
      height: 25em;
      ${props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            width: 40em;
          }
        `}
    }
  `}
`;

const Ages = styled.div`
  ${({ theme, ...props }) => css`
    width: 100%;
    .head {
      color: ${theme.dark};
      font-family: ${theme.fontFancy};
      font-size: 2.1em;
      text-transform: uppercase;
      margin-bottom: 0.5em;
      line-height: 1.1;
    }
    .chart {
      display: flex;
      flex-direction: column;
      height: 40em;
      ${props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            flex-direction: row;
            height: auto;
          }
        `}
    }
    .foot {
      display: none;
      background-color: white;
      padding: 0.6em 0.8em;
      font-size: 1.6em;
      color: ${theme.dark};
      ${props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            display: block;
          }
        `}
      strong {
        display: block;
        color: ${theme.green};
      }
    }
  `}
`;

const Age = styled.div`
  ${({ theme, percent, ...props }) => css`
    /* cursor: pointer; */
    font-size: 1.5em;
    color: white;
    text-align: center;
    height: ${percent}%;
    display: flex;
    align-items: center;
    justify-content: center;

    line-height: 1.1;
    min-height: 1.5em;
    min-width: 2.6em;
    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          font-size: 1.2em;
          width: ${percent}%;
          height: 9em;
          flex-direction: column;
        }
      `}
    strong {
      font-weight: normal;
      opacity: 0.9;
      display: block;
      :before {
        content: " - ";
        margin-left: 0.4em;
        ${props.wide &&
          css`
            @media (min-width: ${theme.sm}) {
              display: none;
            }
          `}
      }
    }
    :nth-child(1) {
      background-color: ${theme.teal};
    }
    :nth-child(2) {
      background-color: ${theme.dark};
    }
    :nth-child(3) {
      background-color: ${theme.green};
    }
    :nth-child(4) {
      background-color: #317c3f;
    }
    :nth-child(5) {
      background-color: #956828;
    }
    :nth-child(6) {
      background-color: #d4b074;
    }
    :nth-child(7) {
      background-color: ${theme.yellow};
    }
    :nth-child(8) {
      background-color: #e98e23;
    }
    :nth-child(9) {
      background-color: #af5434;
    }
    :nth-child(10) {
      background-color: #833f24;
    }
  `}
`;

const Globe = styled.div`
  ${({ theme, ...props }) => css`
    position: relative;

    font-size: 1.3em;
    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          font-size: 1em;
        }
      `}

    .globe {
      position: relative;
      left: 1em;
      width: 25em;
      margin: 0 auto;
      display: block;
    }
    .mag {
      width: 25em;
      position: absolute;
      bottom: 0;
      left: -2.5em;
      display: none;
      ${props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            display: block;
          }
        `}
    }
    .text {
      position: absolute;
      top: 2em;
      left: 1.6em;
      font-size: 2.4em;
      font-family: ${theme.fontFancy};
      text-align: center;
      line-height: 1.1;
      color: white;
      text-transform: uppercase;
    }
    strong {
      display: block;
      font-size: 2.8em;
    }
  `}
`;

const Ranking = styled.div`
  ${({ theme, ...props }) => css`
    padding-bottom: 2em;
    .head {
      color: ${theme.dark};
      font-size: 2em;
      text-transform: uppercase;
      font-family: ${theme.fontFancy};
      margin-bottom: 0.5em;
    }
    .country {
      color: ${theme.teal};
      background: white;
      margin-bottom: 0.75em;
      border-radius: 0.5em;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    .count {
      background: ${theme.green};
      color: white;
      text-align: center;
      font-family: ${theme.fontFancy};
      font-size: 2.6em;
      padding: 0.2em;
      width: 4em;
    }
    .title {
      padding: 0 1em;
      font-size: 2.8em;
      font-weight: bold;
    }
  `}
`;

const Clipboard = styled.div`
  ${({ theme, ...props }) => css`
    margin: 3em auto 3em !important;
    line-height: 1.1;
    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          width: 30em;
          margin: 0 !important;
          width: 20em;
        }
      `}
    > div {
      background: #a6e5e3;
      border-radius: 0.5em;
      position: relative;
      margin-top: 3em;
      padding: 2.5em 2em 2em;
      /* 
      @media (min-width: ${theme.sm}) {
        margin-top: 3em;
      } */
    }
    img {
      position: absolute;
      top: -2.5em;
      left: 50%;
      transform: translateX(-50%);
      width: 8.5em;
    }
    .head {
      color: ${theme.dark};
      font-size: 2em;
      text-transform: uppercase;
      font-family: ${theme.fontFancy};
      line-height: 1.1;
      margin-bottom: 0.6em;
      br {
        display: none;
        ${props.wide &&
          css`
            @media (min-width: ${theme.sm}) {
              display: block;
            }
          `}
      }
    }
    .location {
      font-size: 1.7em;
      display: flex;
      align-items: center;
      margin-bottom: 0.3em;
    }
    .count {
      background: white;
      border-radius: 50%;
      width: 2em;
      height: 2em;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      margin-right: 0.5em;
      color: ${theme.green};
    }
  `}
`;

const Footer = styled.div`
  ${({ theme, ...props }) => css`
    position: relative;
    background: ${theme.dark};
    padding: 2em 31em 3em 2.5em;
    line-height: 1.5;
    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          padding-right: 2.5em;
        }
      `}
    .head {
      font-size: 1.5em;
      color: ${theme.green};
    }
    a {
      font-size: 1.5em;
      color: white;
    }
    img {
      position: absolute;
      right: 2.5em;
      bottom: 0;
      width: 16em;
    }
    .view-map {
      border: none;
      position: absolute;
      right: 14em;
      bottom: 0;
      display: block;
      color: white;
      background: ${theme.yellow};
      padding: 0.7em 1.2em;
      font-size: 1.5em;
      border-radius: 0.25em 0.25em 0 0;
      line-height: 1.2;
      text-align: center;
      :hover {
        opacity: 1;
        background: #ffd951;
      }
      img {
        position: static;
        display: block;
        margin: 0 auto 0.2em;
        width: 2.1em;
      }
    }
  `}
`;

const Hospital = styled.div`
  ${({ theme, ...props }) => css`
    background: white;
    border-radius: 0.5em;
    padding: 2em;
    color: ${theme.dark};
    font-family: ${theme.fontFancy};

    text-transform: uppercase;
    line-height: 1.1;
    /* margin-bottom: 2em; */
    /* 
    @media (min-width: ${theme.sm}) { */
      /* margin-right: 3em; */
      /* margin-bottom: 0; */
    /* } */
    .head {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.5em;
    }
    strong {
      font-size: 4.8em;
      color: ${theme.yellow};
      margin-right: 0.25em;
      letter-spacing: 0;
    }
    span {
      font-size: 1.8em;
    }
    img {
      display: block;
      width: 17em;
      margin: 0 auto;
    }
  `}
`;

const Logo = styled.div`
  ${({ theme, ...props }) => css`
    display: flex;
    align-items: center;
    padding: 1em 2.5em 0.5em;

    ${props.wide &&
      css`
        @media (min-width: ${theme.sm}) {
          display: none;
        }
      `}

    img {
      width: 6em;
      margin-right: 1em;
    }
    h1 {
      white-space: nowrap;
      font-size: 3.5em;
      color: ${theme.teal};
      margin: 0;
    }
  `}
`;
