import React from 'react';
import Pivot from './components/Pivot/Pivot.jsx';
import Select from 'react-select-plus';
import Papa from 'papaparse/papaparse.js';

import 'react-select-plus/dist/react-select-plus.css';
import '../styles/index.scss';

export default class App extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
				data: [
         ['name', 'gender', 'house', 'age'],
         ['Jon', 'm', 'Stark', 14],
         ['Arya', 'f', 'Stark', 10],
         ['Cersei', 'f', 'Baratheon', 38],
         ['Tywin', 'm', 'Lannister', 67],
         ['Tyrion', 'm', 'Lannister', 34],
         ['Joffrey', 'm', 'Baratheon', 18],
         ['Bran', 'm', 'Stark', 8],
         ['Jaime', 'm', 'Lannister', 32],
         ['Sansa', 'f', 'Stark', 12],
       ],
       dataSize: 'small',
       selectedAggregationDimension: 'age',
       isLoaded: true,
    };

    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.onSelectData = this.onSelectData.bind(this);
  }

    // componentWillMount() {
    //   Papa.parse('https://raw.githubusercontent.com/turnerniles/react-virtualized-pivot/master/src/sampledata/RejectStatsA.csv', {
    //     download: true,
    //     complete: (results) => {
    //       this.setState({
    //         data: results.data,
    //         selectedAggregationDimension: 'Amount Requested',
    //         isLoaded: true,
    //       })
    //     }
    //   });
    // }

  handleFileSelect(evt) {
    const file = evt.target.files[0];

    Papa.parse(file, {
      complete: (results) => {
        this.setState({data: results.data})
      }
    });
  }

  onSelectData(dataSize){
    if (dataSize.value === 'small') {
      this.setState({
        dataSize: dataSize.value,
        data: [
         ['name', 'gender', 'house', 'age'],
         ['Jon', 'm', 'Stark', 14],
         ['Arya', 'f', 'Stark', 10],
         ['Cersei', 'f', 'Baratheon', 38],
         ['Tywin', 'm', 'Lannister', 67],
         ['Tyrion', 'm', 'Lannister', 34],
         ['Joffrey', 'm', 'Baratheon', 18],
         ['Bran', 'm', 'Stark', 8],
         ['Jaime', 'm', 'Lannister', 32],
         ['Sansa', 'f', 'Stark', 12],
       ],
       selectedAggregationDimension: 'age',
      })
    }
    if (dataSize.value === 'medium') {
      this.setState({
        dataSize: dataSize.value,
        data: [
         ['donkey', 'cow', 'rabbit', 'age'],
         ['Jon', 'm', 'Stark', 14],
         ['Arya', 'f', 'Stark', 10],
         ['Cersei', 'f', 'Baratheon', 38],
         ['Tywin', 'm', 'Lannister', 67],
         ['Tyrion', 'm', 'Lannister', 34],
         ['Joffrey', 'm', 'Baratheon', 18],
         ['Bran', 'm', 'Stark', 8],
         ['Jaime', 'm', 'Lannister', 32],
         ['Sansa', 'f', 'Stark', 12],
       ],
       selectedAggregationDimension: 'age'
      })
    }
    if (dataSize.value === 'large') {
      this.setState({
        dataSize: dataSize.value,
        isLoaded: false,
      })
      Papa.parse('https://raw.githubusercontent.com/turnerniles/react-virtualized-pivot/master/src/sampledata/RejectStatsA.csv', {
        download: true,
        complete: (results) => {
          this.setState({
            data: results.data,
            selectedAggregationDimension: 'Amount Requested',
            isLoaded: true,
          })
        }
      })
    }
  }

  render () {
    const {
      dataSize,
      isLoaded,
      selectedAggregationDimension,
    } = this.state;
    return (
      <div>
        <div className="loader" style={{'display': isLoaded ? 'none' : 'inherit'}}>
          <div className="inner one"></div>
          <div className="inner two"></div>
          <div className="inner three"></div>
        </div>
        <div className="app-menu" style={{'width': '100%', height: '50px'}}>
          <div className='select-container'>
            <div
              className="title"
              style={{
                'backgroundColor': '#FF7373',
                'color': '#fff',
              }}
            >
              Dataset Select
            </div>
            <Select
              name="Dataset"
              value={dataSize}
              options={[
          	    { value: 'small', label: 'small' },
          	    { value: 'medium', label: 'medium' },
          			{ value: 'large', label: 'large' },
          		]}
              onChange={this.onSelectData}
              menuContainerStyle={{
                  zIndex: 2,
              }}
              clearable={false}
            />
          </div>
          <input
            type="file"
            onChange={this.handleFileSelect}
            style={{padding: '5px', width: '200px',
              display: 'inline-block'}}
          />
        </div>
        <Pivot
          data={this.state.data}
          selectedAggregationDimension={selectedAggregationDimension}
          colorPack={{
            sortableFieldBackground: '#5F9EDF',
            sortableFieldText: '#fff',
            sortableContainerBackground: '#fff',
            selectorContainerTitleBackground: '#FF7373',
            selectorContainerTitleText: '#fff',
            leftHeaderCellBackground:'rgb(188, 57, 89)',
            leftHeaderCellText:'#fff',
            headerGridBackground:'rgb(51, 51, 51)',
            headerGridText:'#fff',
            leftSideGridBackground: 'rgb(188, 57, 89)',
            leftSideGridText:'#fff',
            bodyGridBackground: 'rgb(120, 54, 70)',
            bodyGridText:'#fff',
            evenRowBackground: '',
            oddRowBackground: 'rgba(0, 0, 0, .1)',
          }}
        />
      </div>
    )
  }
}
