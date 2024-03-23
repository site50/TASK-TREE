import { useState, useEffect } from 'react';
//import './Son.css'

function Son() {
    const [sons, setSons] = useState([{}]);
    const [son, setSon] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3005/data`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('ERROR');
                }
                return res.json()
            })
            .then((data) => {
                //  console.log(data);
                const r = data.map((x: any) => x.data.son)
                const h = r.filter((x: any) => x !== undefined)
                // console.log(h);
                setSons(h);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const addSon = () => {
        const id = sons.length + 1
        let body = { id: id, son: son }
        // console.log(body, 'DDD')
        if (body.son.length != 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            fetch(`http://localhost:3005/post`, requestOptions)
                .then((res) => res.json())
                .then((results) => {
                    console.log(sons, 'RESULT', results)

                });
            setSons([...sons, body]);
            setSon('')
        }
    }
    const deleteItem = (id:any, son:any) => {
        let body = { id: id, son: son }
        console.log(body)
        fetch(`http://localhost:3005/delete/${id}`, {
            method: "PUT",
           // headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(body),
           headers: {
             "Content-type": "application/json; charset=UTF-8",
           }
        })
            .then((response) => response.json())
            .then(() => {
                setSons((values) => {
                    return values.filter((item) => item.id !== id);
                });

            });
    }
    const update = (a: any) => {
        setSon(a)
        console.log(son, 'update')
    }
    const sav_update = (n: any) => {
        console.log(n.id, 'SAV update')
    }
    return (
        <div className="box-container" >
            {sons.map((a, index) =>
                <span key={index} >
                    <div className="childe">  {a.son}</div>
                    <button onClick={() => deleteItem(a.id, a.son)} className="button childe">delete</button>
                    <button onClick={() => update(a.son)} className="button childe">update</button>
                </span>)}

            <div >
                <input value={son} onChange={e => setSon(e.target.value)} className="childe" />
                <button className="button childe" onClick={addSon}>add</button>
                <button className="button childe" onClick={() => sav_update(son)}>change</button>
            </div>
        </div >
    )
}

export default Son;

