import React, { useState } from 'react';
import './App.css';

function App() {
    const [notes, setNotes] = useState([]);

    const [newNoteTitle, setNewNoteTitle] = useState('');

    const [selectedNote, setSelectedNote] = useState(null);

    function checkNote(e, note, item) {
        var allNotes = [...notes];
        allNotes[note].items[item].marked = e.target.checked;
        setNotes(allNotes);
    }

    function addNote(e) {
        e.preventDefault();

        setNotes(
            [
                {
                    title: newNoteTitle,
                    items: []
                },
                ...notes
            ]
        );

        setNewNoteTitle('');
    }

    function removeNote(note) {
        setSelectedNote(null);
        var allNotes = [...notes];
        allNotes.splice(note, 1);
        setNotes(allNotes);
    }

    function addNoteItem(note) {
        var allNotes = [...notes];
        allNotes[note].items.push(
            { title: '', marked: false },
        )
        setNotes(allNotes);
    }

    function removeNoteItem(note, item) {
        var allNotes = [...notes];
        allNotes[note].items.splice(item, 1);
        setNotes(allNotes);
    }

    function updateNoteItem(e, note, item) {
        var allNotes = [...notes];
        allNotes[note].items[item].title = e.target.value;
        setNotes(allNotes);
    }

    function updateNoteTitle(e) {
        var allNotes = [...notes];
        allNotes[selectedNote].title = e.target.value;
        setNotes(allNotes);
    }

    return (
        <div className="app">
            <header className="header">
                <h1>To Do List</h1>
            </header>
            <div className="sidebar">
                <form onSubmit={(e) => addNote(e)}>
                    <input
                        className="addnote"
                        placeholder="Digite o titulo da nota"
                        type="text"
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                    />
                </form>
                <ul>
                    {notes.map((note, index) => (
                        <li className="note" key={index}>
                            <div className="notetitle" onClick={() => setSelectedNote(index)}>
                                <h2>{note.title}</h2>
                            </div>
                            <div className="btnnote" onClick={() => removeNote(index)}>
                                <i class="fas fa-times"></i>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="main">
                <div className="mainnote">
                    <input 
                        name="title"
                        type="text"
                        value={notes[selectedNote]?.title}
                        onChange={(e) => updateNoteTitle(e)}
                        style={{display: !!notes[selectedNote] ? 'block' : 'none'}}
                    />
                    <ul>
                        {notes[selectedNote]?.items.map((item, index) => (
                            <li className="item" key={index}>
                                <input
                                    name="marked"
                                    type="checkbox"
                                    checked={item.marked}
                                    onChange={(e) => checkNote(e, selectedNote, index)}
                                />
                                <input
                                    name="item"
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => updateNoteItem(e, selectedNote, index)}
                                />
                                <div className="btnitem" onClick={() => removeNoteItem(selectedNote, index)}>
                                    <i class="fas fa-times"></i>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="btnitem" style={{display: !!notes[selectedNote] ? 'block' : 'none'}} onClick={() => addNoteItem(selectedNote)}>
                        <i className="fas fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
