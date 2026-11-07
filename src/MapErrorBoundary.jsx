import React from 'react';

export default class MapErrorBoundary extends React.Component {
 state={error:null};
 static getDerivedStateFromError(error) {return {error};}
 componentDidUpdate(previous) {
  if(previous.model!==this.props.model&&this.state.error) this.setState({error:null});
 }
 render() {
  if(this.state.error) return <section className="section-intro" role="alert"><h2>Не удалось построить карту</h2><p>{this.state.error.message}</p><p>Можно открыть другую модель или вернуться в «Анатомию».</p><button className="tiny-btn" onClick={()=>this.setState({error:null})}>Повторить</button></section>;
  return this.props.children;
 }
}
