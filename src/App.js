import './App.css';
import { shuffle, uniq } from 'lodash';
import { useState } from 'react';
import ExclusionSurvey from './components/Survey/ExclusionSurvey';
function App() {
  const [appData, setAppData] = useState(null);
  const loadData = async () => {
    try{
      const response = await fetch('https://danielpatrickkoenig.github.io/shared-app-resources/dndSurveyQuestionData.json');
      const json = await response.json();
      setAppData({ ...json, question: shuffle(json.question) });
    }
    catch(e){
      console.error(e);
    }
  };
  if (!appData) {
    loadData();
  }
  const completeHandler = (selections) => {
    const exclusionGroups = uniq(selections.map(item => item.group));
    const groupScores = exclusionGroups
      .map(item => {
        const total = selections
          .filter(selection => selection.group === item)
          .reduce((t, selection) => Number(t) + Number(selection.value), 0);
        return { total, group: item };
        
      })
      .sort((a, b) => a.total - b.total);
    // console.log(selections);
    console.log(groupScores);
    const output = groupScores
      .filter(item => item.total == groupScores[0].total)
      .map(item => Number(item.group));
    console.log(output);
    const classes = Object.keys(appData.exclusion_groups)
      .filter(item => output.includes(appData.exclusion_groups[item]));
    console.log(classes);
  }
  return (
    <div className="App">
      {appData?.question && (
        <>
        <p>{appData?.question?.length}</p>
        <ExclusionSurvey
          questions={appData?.question}
          onComplete={completeHandler}
        />
        </>
      )}
    </div>
  );
}

export default App;
