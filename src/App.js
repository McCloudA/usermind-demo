import React, { useState } from 'react';
// 3rd Party
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Chart from "react-google-charts";
import FontAwesome from 'react-fontawesome';
import v4 from 'uuid';
import scrollToComponent from 'react-scroll-to-component';
// Components
import AddDateInfoForm from './presentationComponents/AddDateInfoForm';
import { refreshObj, toTitleCase } from './helpers';
// Styles
import './App.css';

const App = () => {
  const masterListofProduce = [
    'bananas',
    'strawberries',
    'apples',
    'oranges'
  ];
  let chartSection;

  const [produce, setProduce] = useState({
    '01/07/2019': {
      selected: false,
      bananas: 401,
      strawberries: 58,
      apples: 290,
      oranges: 191
    },
    '02/07/2019': {
      selected: false,
      bananas: 354,
      strawberries: 98,
      apples: 132,
      oranges: 123
    },
    '03/07/2019': {
      selected: false,
      bananas: 512,
      strawberries: 120,
      apples: 321,
      oranges: 159
    },
    '04/07/2019': {
      selected: false,
      bananas: 287,
      strawberries: 75,
      apples: 214,
      oranges: 187
    }
  });

  const addToProduce = (newEntry) => {
    const { date, bananas, strawberries, apples, oranges } = newEntry;

    produce[date] = {
      selected: true,
      bananas: parseInt(bananas, 10),
      strawberries: parseInt(strawberries, 10),
      apples: parseInt(apples, 10),
      oranges: parseInt(oranges, 10)
    };

    setProduce(refreshObj(produce));
  };

  const scrollTo = () => {
    scrollToComponent(
      chartSection,
      {
        offset: 0,
        align: 'top',
        duration: 1500
      }
    );
  };

  const chartData = (masterListofProduce, produce, produceDatesSelected) => {
    return [['Fruit', 'Total Sales']].concat(
      masterListofProduce.map(produceName => ([
        toTitleCase(produceName),
        produceDatesSelected.reduce((accumulator, date) => accumulator + produce[date][produceName], 0)
      ]))
    );
  };

  const produceDatesSelected = Object.keys(produce).filter(produceKey => produce[produceKey].selected);
  const chartWidth = `${window.innerWidth/1.4}px`;

  return (
    <div className="App">
      <div className="title-container">
        <h1 className="App-title">
          A Demo For Usermind...
        </h1>
      </div>
      <header className="App-header first">
        <FontAwesome
          name='chevron-down'
          size='5x'
          onClick={scrollTo}
        />
      </header>
      <Grid
        className="grid-container"
        ref={(sec) => { chartSection = sec; }}>
        <Row className="title-row">
          <Col xs={12} xsOffset={0} md={8} mdOffset={2}>
            <h1>Fruit Database Chart Maker</h1>
          </Col>
        </Row>

        <Row className="InfoRow">
          <Col xs={12} xsOffset={0} md={7}>
            <h2 className="sales-info-title">Sales Info By Date</h2>
            <Table className="sales-info-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Select For Table?</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(produce)
                  .map(dateKey => (
                    <tr key={v4()}>
                      <td>{dateKey}</td>
                      <td
                        className="checkbox-table-data"
                        onClick={() => {
                          produce[dateKey].selected = !produce[dateKey].selected;
                          setProduce(refreshObj(produce));
                        }}>
                        <form>
                          <input
                            className="select-date-checkbox"
                            type="checkbox"
                            checked={produce[dateKey].selected} />
                        </form>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Col>
          <Col xs={12} xsOffset={0} md={5}>
            <AddDateInfoForm addToProduce={addToProduce} />
          </Col>
        </Row>
        <Row className="InfoRow">
          <Col xs={12} xsOffset={0} md={8} mdOffset={2}>
            <Table bordered>
              <thead>
                <tr>
                  <th className="date-table-col">Date</th>
                  {
                    masterListofProduce.map(fruit => <th key={v4()}>{toTitleCase(fruit)}</th>)
                  }
                  <th>Total Sales By Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  produceDatesSelected
                  .map(dateKey => (
                    <tr key={v4()}>
                      <td>
                        {
                          dateKey
                        }
                      </td>
                      {
                        masterListofProduce.map(fruit => <td key={v4()}>{produce[dateKey][fruit]}</td>)
                      }
                      <td className="produce-totals">
                        {
                          masterListofProduce.reduce((accumulator, item) => accumulator + produce[dateKey][item], 0)
                        }
                      </td>
                    </tr>
                  ))
                }
                {
                  produceDatesSelected.length
                  ? (
                    <tr className="total-fruit-sales-info-row">
                      <td>Total Sales By Fruit</td>
                      {
                        masterListofProduce
                        .map(produceName => (
                          <td key={v4()}>
                            {
                              produceDatesSelected
                              .reduce((accumulator, date) => accumulator + produce[date][produceName], 0)
                            }
                          </td>
                        ))
                      }
                    </tr>
                  )
                  : (
                    <tr>
                      <td colSpan="6" className="no-data-yet">
                        You have not selected any data yet!
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          </Col>
        </Row>
        {
          !!produceDatesSelected.length &&
          <Row className="InfoRow">
            <Col xs={12} xsOffset={0} md={8} mdOffset={2}>
              <div className="chart-container" style={{ width: chartWidth }}>
                <Chart
                  width={chartWidth}
                  height={'500px'}
                  chartType="PieChart"
                  loader={<div>Loading Chart...</div>}
                  data={chartData(masterListofProduce, produce, produceDatesSelected)}
                  options={{
                    title: 'Total Sales By Fruit',
                    is3D: true,
                    backgroundColor: '#fdcc52' // yellow
                  }}
                  rootProps={{ 'data-testid': '1' }}
                  />
              </div>
            </Col>
          </Row>
        }
      </Grid>
    </div>
  );
}

export default App;
