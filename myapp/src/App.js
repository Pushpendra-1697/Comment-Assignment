import './App.css';
import { useState } from 'react';


var data = JSON.parse(localStorage.getItem('data')) || [];
function App() {
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');
  const [filterTitle, setFilterTitle] = useState('');


  // console.log(data);

  const handleClick = () => {
    let payload = { id: Math.random() + comment, comment, Upvotes: 0, Downvotes: 0, replyArr: [] };
    data.push(payload);
    localStorage.setItem('data', JSON.stringify(data));
    setComment('');
  };

  const handleUpvote = (id) => {
    for (let ele of data) {
      if (ele.id === id) {
        ele.Upvotes++;
      }
    }
    localStorage.setItem('data', JSON.stringify(data));
    window.location.reload();
  };
  const handleDownvotes = (id) => {
    for (let ele of data) {
      if (ele.id === id) {
        ele.Downvotes--;
      }
    }
    localStorage.setItem('data', JSON.stringify(data));
    window.location.reload();
  }

  const handleReply = (id) => {
    for (let ele of data) {
      if (ele.id === id) {
        ele.replyArr.push({ reply });
      }
    }
    localStorage.setItem('data', JSON.stringify(data));
    setReply('');
  };

  const handleNestedReply = (id) => {
    let p = window.prompt('Enter Reply');
    console.log(p);
  };

  const handleAscending = () => {
    let sortAsc = data.sort((a, b) => (a.Upvotes + a.Downvotes) - (b.Upvotes + b.Downvotes));
    localStorage.setItem('data', JSON.stringify(sortAsc));
    window.location.reload();
  };
  const handleDescending = () => {
    let sortDesc = data.sort((a, b) => (b.Upvotes + b.Downvotes) - (a.Upvotes + a.Downvotes));
    localStorage.setItem('data', JSON.stringify(sortDesc));
    window.location.reload();
  };

  const handleFilter = () => {
    let filteredData = data.filter((ele, index, data) => {
      return ele.comment.toUpperCase() == filterTitle.toUpperCase()
    });
    console.log(filteredData);
  };

  const handleParticularDelete = (id) => {
    data.splice(id, 1);
    localStorage.setItem('data', JSON.stringify(data));
    window.location.reload();
  };

  const handleClearAll = () => {
    localStorage.clear();
    window.location.reload();
  };


  return (
    <div className="App">

      <div style={{ margin: '2% 0' }}>
        <input placeholder='Enter Comment' value={comment} onChange={(e) => setComment(e.target.value)}  ></input>
        <button onClick={handleClick}>Add Comment</button>
      </div>

      <div style={{ marginBottom: '5%' }}>
        <h1>Sort by Score:</h1>
        <button onClick={handleAscending}>Ascending</button>
        <button onClick={handleDescending}>Descending</button>
      </div>

      <div style={{ marginBottom: '5%' }}>
        <h1>Filter by Comment Name:</h1>
        <input placeholder='Enter Comment Title' onChange={(e) => setFilterTitle(e.target.value)} />
        <button onClick={handleFilter}>Search</button>
      </div>

      {data.length === 0 ? <h1>No Comments</h1> :
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '5%' }}>
          {data && data.map((ele) =>
            <div key={ele.id} style={{ border: '1px solid black', borderRadius: '5%', padding: '10px' }}>
              <h1>{ele.comment}</h1>
              <button onClick={() => handleUpvote(ele.id)}>Upvotes: {ele.Upvotes}</button>
              <button onClick={() => handleDownvotes(ele.id)}>Downvotes: {ele.Downvotes}</button>
              <h1>Final Score: {ele.Upvotes + ele.Downvotes}</h1>
              <div>
                <input placeholder='Reply Desc' onChange={(e) => setReply(e.target.value)} />
                <button onClick={() => handleReply(ele.id)}>Reply</button>
                <div>
                  {ele.replyArr && ele.replyArr.map(({ reply }, i) =>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <p key={i}>{reply}</p>
                      <p onClick={handleNestedReply} style={{ border: '1px solid black', borderRadius: '5px', padding: '2px' }}>Reply</p>
                    </div>
                  )}
                </div>
              </div>
              <button onClick={() => handleParticularDelete(ele.id)}>Delete</button>
            </div>

          )}
        </div>
      }


      <hr />
      <button style={{ fontSize: '20px', padding: '10px', borderRadius: '2px', color: 'red' }} onClick={handleClearAll}>Clear All</button>

    </div>
  );
}

export default App;
