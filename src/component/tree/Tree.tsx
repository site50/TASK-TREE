import './Tree.css'
import { useState } from 'react';
import Daughter from '../Daughter';
import Son from '../Son';
import Mother from '../Mother';
import Father from '../Father';

function Tree() {
    const [grandparents, setGrandParents] = useState(false)
    const [parents, setParents] = useState(false)
    const [childrens, setChildrens] = useState(false)

    const toggleGrandParents = () => {
        setGrandParents(!grandparents)
    }
    const toggleParents = () => {
        setParents(!parents)
    }
    const toggleChildrens = () => {
        setChildrens(!childrens)
    }
    return (
        <div style={{ color: 'green',  marginBottom: '5rem' }}>
     
            <div>
                <div className="container">
                    <div className='app'>
                        <div className="relatives relation" onClick={toggleGrandParents}  >grandparents</div>
                    </div>
                    <div className={grandparents ? 'show-class' : null} id="box-hide">
                        <div className='app'>
                            <div className='app grand'  >
                                <div className="relatives grandparents"  >
                                    <div className='title'>grandmother</div>
                                    <div className="drop-down-box" >
                                        <p >Maria</p>
                                        <div className="action">
                                            <input />  <button className="button">add</button><br></br>
                                            <button className="button">change</button>
                                            <button className="button">delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relatives grandparents">
                                    <div className='title'>grandfather</div>
                                    <div className="drop-down-box" >
                                        <p>Peter</p>
                                        <div className="action">
                                            <input />  <button className="button">add</button><br></br>
                                            <button className="button">change</button>
                                            <button className="button">delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relatives grandparents">
                                    <div className='title'>grandmother</div>
                                    <div className="drop-down-box" >
                                        <p>Nina</p>
                                        <div className="action">
                                            <input />  <button className="button">add</button><br></br>
                                            <button className="button">change</button>
                                            <button className="button">delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relatives grandparents">
                                    <div className='title'>grandfather</div>
                                    <div className="drop-down-box" >
                                        <p>Nikolas</p>
                                        <div className="action">
                                            <input />  <button className="button">add</button><br></br>
                                            <button className="button">change</button>
                                            <button className="button">delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='app' onClick={toggleParents}>
                        <div className="relatives relation">parents</div>
                        <div className="relatives relation">parents</div>
                    </div>
                    <div className={parents ? 'show-class' : null} id="box-hide">
                        <div className='app'>
                            <div className="relatives branch-left">
                                <div className='title'>mother</div>
                                <div className="parents">
                                    <Mother />
                                </div>
                            </div>
                            <div className="relatives context-relatives">spouses</div>
                            <div className="relatives branch-right">
                                <div className='title'>father</div>
                                <div className="parents">
                                    <Father />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='app' onClick={toggleChildrens}>
                        <div className="relatives relation">childrens</div>
                    </div>
                    <div className={childrens ? 'show-class' : null} id="box-hide">
                        <div className='app'>
                            <div className="relatives branch-left">
                                <div className='title'>son</div>
                                <div className="parents">
                                    <Son />
                                </div>
                            </div>
                            <div className="relatives context-relatives">siblings</div>
                            <div className="relatives branch-right">
                                <div className='title'>daughter</div>
                                <div className="parents">
                                    <Daughter />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Tree
