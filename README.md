# REACT HOOKS ENG VERSION

1) Hooks are a new feature addition in React version 16.8
2) They allow you to use React features without having to write a class
3) Avoid the whole confusion with ***this*** keyword
4) Allow you to reuse stateful logic
5) Organize the logic inside a component into reusable isolated units

---
# Rules

1) Only call HOOKS at the Top Level. Don't call Hooks inside loops, conditions, or nested functions
2) Only call HOOKS from React Functions. Call them from within React functional components and not just any regular JavaScript function


#  useState

useState è una funzione di React che serve a creare e gestire lo stato di un componente funzionale.

In pratica 'useState' permette di definire una variabile di stato e di associarle una funzione che ne modifichi il valore. Quando il valore dello stato viene modificato, il componente viene ri-renderizzato e il nuovo valore viene visualizzato.

Ciò permette ai componenti di reagire in modo dinamico alle interazioni dell'utente o a eventuali cambiamenti nello stato dell'applicazione.

Esempio con class component: [ClassCounter](./src/components/useStateComponents/ClassCounter.js)
```js
import React, { Component } from 'react';

class ClassCounter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    incrementCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.incrementCount}> Count-Class {this.state.count} </button>
            </div>
        );
    }
}
export default ClassCounter;
```
Stesso esempio con gli hooks: [HookCounter](./src/components/useStateComponents/HookCounter.js)
```js
import React, { useEffect, useState } from 'react';

const HookCounter = () => {
    const [count, setCount] = useState(0)
    const incrementCount = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <button onClick={() => incrementCount()}>Count-Hooks {count}</button>
        </div>
    );
};

export default HookCounter;
```
## How to set state based on the previous state value?

To update state based on the previous value pass in a function to the state setter

In the file [HookCounterTwo](./src/components/useStateComponents/HookCounterTwo.js)
```js
const incrementFive = () => {
    for(let i = 0; i < 5; i++) {
        setCount(prevCount => prevCount + 1)
    }
}

return (
    <div>
        {count}
        <button onClick={incrementFive}> increment five </button>
    </div>
)
```

## useState with object

In file [HookCounterThree](./src/components/useStateComponents/HookCounterThree.js)

```js
import React, { useState } from 'react';

const HookCounterThree = () => {

    const [name, setName] = useState({ firstName: '', lastName: '' })

    return (
        <div>
            <form>
                <input
                    type='text'
                    value={name.firstName}
                    onChange={e => setName({ ...name, firstName: e.target.value })}
                />
                <input
                    type='text'
                    value={name.lastName}
                    onChange={e => setName({ ...name, lastName: e.target.value })}
                />
                <h2>Your first name is: {name.firstName}</h2>
                <h2>Your last name is: {name.lastName}</h2>
            </form>

        </div>
    );
};

export default HookCounterThree;
```
N.B. Senza lo spread operator, quando vado a scrivere su una cella, l'altra viene nascosta. Usando lo spread operator si risolve il problema.

## useState with array
```js
import React, { useState } from 'react';

const HookeCounterFour = () => {
    const [items, setItems] = useState([]) // empty array inside useState
    const addItem = () => {
        setItems([...items, {
            id: items.length,
            value: Math.floor(Math.random() * 10) + 1
        }])
    }
    return (
        <div>
            <button onClick={addItem}>Add a number</button>
            <ul>
                {
                    items.map(item => (<li key={item.id}>{item.value}</li>))
                }
            </ul>
        </div>
    );
};
export default HookeCounterFour;
```

---

# useEffect

It is used for causing side effects in functional components.

Per 'side effect' si intendono eventuali azioni che possono verificarsi in modo collaterale alla modifica dello stato di un componente.

Quando si utilizza la funzione 'useState' di React per gestire lo stato di un componente, qualsiasi modifica allo stato può causare 'side effect' come la modifica del DOM, l'invio di richieste HTTP o l'attivazione di altre funzioni.

E' importante comprendere i possibili 'side effect' delle modifiche allo stato di un componente, poichè ciò può influire sulla corretta gestione del ciclo di vita del componente e sull'ottimizzazione delle prestazioni dell'applicazione.


Esempio con le classi (non utilizzano useEffect): [ClassCounterOne](./src/components/useEffectComponents/ClassCounterOne.js)
```js
import React, { Component } from 'react';

class ClassCounterOne extends Component {
    constructor(props) {
        super(props);
        this.setState = {
            count: 0
        }
    }

    componentDidMount() {
        document.title = `clicked ${this.state.count} times`
    }

    componentDidUpdate(prevProps, prevState) {
        document.title = `clicked ${this.state.count} times`
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Click {this.state.count} times
                </button>
            </div>
        );
    }
}
export default ClassCounterOne;
```
Stesso esempio usando useEffect:
```js
import React, { useEffect, useState } from 'react';

const HookCounterFive = () => {

    const [count, setCount] = useState(0)

    useEffect(() => {
        document.title = `You clicked ${count} times`
    }, [count])

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click {count} times</button>
        </div>
    );
};

export default HookCounterFive;
```
## Run effects only once

Lo useEffect con le parentesi [] vuote è il corrispondente del ComponentDidMount() nelle classi. Esegue cioè qualcosa solo al primo render del componente e solo una volta.

Nel file [HookMouse](./src/components/useStateComponents/HookMouse.js) un esempio:
```js
import React, { useEffect, useState } from 'react';

const HookMouse = () => {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const logMousePosition = e => {
        console.log('Mouse event')
        setX(e.clientX)
        setY(e.clientY)
    }
    useEffect(() => {
        console.log('useEffect called')
        window.addEventListener('mousemove', logMousePosition)
    }, []) // corrispondente del componentDidMpunt 
      return (
        <div>
            Hooks X - {x} Y - {y}
        </div>
    );
};
export default HookMouse;
```
## useEffect with cleanup
Andiamo a mimare in questo esempio il corrispondente del ComponentWillUnMount delle classi con lo useEffect.

Nel file [MouseContainer](./src/components/useStateComponents/MouseContainer.js) un esempio:
```js
import React, { useState } from 'react';
import HookMouse from './HookMouse';

const MouseContainer = () => {

    const [display, setDisplay] = useState(true)

    return (
        <div>
            <button onClick={() => setDisplay(!display)}>Toggle Display</button>
            {
                display && <HookMouse />
            }
        </div>
    );
};

export default MouseContainer;
```
Problema: quando clicco sul bottone il componente 'HookMouse' viene distrutto però se muovo il mouse nella console posso vedere che ancora viene calcolata la posizione dell'asse x e y.

Nelle classi abbiamo 'componentWillUnmount()' nel quale possiamo dirgli di rimuovere l'evento 'mousemove'. 

Ecco invece come possiamo fare utilizzando lo useEffect.

Soluzione:

La funzione che viene passata allo useEffect nel file [HookMouse](./src/components/useStateComponents/HookMouse.js) può ritornare una funzione che verrà eseguita quando il componente viene distrutto (componentWillUnmount). In sostanza il return è una cleanup function.

Modifichiamo quindi lo useEffect di HookMouse nel seguente modo:
```js
useEffect(() => {
        console.log('useEffect called')
        window.addEventListener('mousemove', logMousePosition)

        return () => {
            console.log('Component unmounting code')
            window.removeEventListener('mousemove', logMousePosition)
        }
    }, [])
```

## Fetching data with useEffect pt.1

Da terminale installere axios con il seguente comando:
```
npm install axios
```
Nel file [DataFetching](./src/components/useEffectComponents/DataFetching.js):
```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetching = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                console.log(res);
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <ul>
                {
                    posts.map(post => (<li key={post.id}>{post.title}</li>))
                }
            </ul>

        </div>
    );
};

export default DataFetching;
```
Inseriamo ora un campo di input dove scriverò il numero di ID del post e un bottono per avviare la ricerca:

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetching = () => {

    const [post, setPost] = useState({})
    const [id, setId] = useState(1)
    const [idFromButtonClick, setIdFromButtonClick] = useState(1)

    const handleClick = () => {
        setIdFromButtonClick(id)
    }

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${idFromButtonClick}`)
            .then(res => {
                console.log(res);
                setPost(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [idFromButtonClick])

    return (
        <div>
            <input type='text' value={id} onChange={e => setId(e.target.value)} />
            <button type='button' onClick={handleClick}>Fetch Post</button>
            {/* <ul>
                {
                    posts.map(post => (<li key={post.id}>{post.title}</li>))
                }
            </ul> */}
            <div>{post.title}</div>

        </div>
    );
};

export default DataFetching;
```

---

# useCallback()

useCallback è un hook di React che serve a memorizzare e riutilizzare una funzione tra render di un componente, in modo da evitare di creare una nuova istanza della funzione ad ogni renderizzazione. In questo modo, è possibile migliorare le prestazioni del componente, poiché non sarà necessario ricostruire la funzione ad ogni renderizzazione.

La sintassi di base di useCallback è la seguente:
```js
const memoizedCallback = useCallback(
  () => {
    // do something
  },
  [dependencies],
);
```
useCallback prende due argomenti: la funzione che si vuole memorizzare e un array di dipendenze. La funzione memorizzata viene creata solo la prima volta che il componente viene renderizzato, oppure quando una delle dipendenze cambia.

Ecco un esempio di utilizzo di useCallback. Supponiamo di avere un componente Button che riceve una funzione onClick come prop. Inizialmente, la funzione è così definita:
```js
function Button({ onClick }) {
  return <button onClick={onClick}>Click me!</button>;
}
```
Ogni volta che il componente Button viene renderizzato, viene creato una nuova istanza della funzione onClick. Tuttavia, se la funzione onClick dipende solo da alcune prop del componente, possiamo utilizzare useCallback per memorizzarla:
```js
function Button({ onClick }) {
  const memoizedOnClick = useCallback(() => {
    onClick('clicked!');
  }, [onClick]);

  return <button onClick={memoizedOnClick}>Click me!</button>;
}
```
In questo modo, la funzione memoizedOnClick viene creata solo la prima volta che il componente viene renderizzato o quando la dipendenza onClick cambia. In questo modo, evitiamo di creare una nuova funzione ad ogni renderizzazione, ottenendo così un miglioramento delle prestazioni.

Un altro esempio di utilizzo di useCallback potrebbe essere in un componente che deve eseguire un'operazione costosa, come un'API call, solo quando certe dipendenze cambiano. In questo caso, possiamo memorizzare la funzione che esegue l'API call utilizzando useCallback, passando le dipendenze come secondo argomento. In questo modo, l'API call verrà eseguita solo quando una delle dipendenze cambia.
```js
function MyComponent({ userId }) {
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    const response = await fetch(`https://example.com/api/user/${userId}`);
    const data = await response.json();
    setData(data);
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ...
}
```
In questo esempio, la funzione fetchData viene creata solo la prima volta che il componente viene renderizzato o quando userId cambia. In questo modo, evitiamo di eseguire l'API call ad ogni renderizzazione del componente. 

---

Nel nostro caso:

In app.js I have included one component called 'ParentComponent'. The component is simply a container for other components. If you take a look at the JSX you can see that we have five components  in total of which two are reused with different props.

The first component is the [Title](./src/components/useCallbackComponents/Title.js) component. Then we have a [Button](./src/components/useCallbackComponents/Button.js) component and the [Count](./src/components/useCallbackComponents/Count.js) component.

Vediamo un esempio:

In ParentComponent.js:
```js
import React, { useState } from 'react';
import Count from './Count'
import Button from './Button'
import Title from './Title'


const ParentComponent = () => {
    const [age, setAge] = useState(25)
    const [salary, setSalary] = useState(50000)

    const incrementAge = () => {
        setAge(age + 1)
    }

    const incrementSalary = () => {
        setSalary(salary + 1000)
    }

    return (
        <div>
            <Title />
            <Count text='Age' count={age} />
            <Button handleClick={incrementAge}>Increment Age</Button>
            <Count text='Salary' count={salary} />
            <Button handleClick={incrementSalary}>Increment Salary</Button>
        </div>
    );
};

export default ParentComponent;
```
Dove Button e Count sono i seguenti:
```js
//Button component
import React from 'react';

const Button = ({ handleClick, children }) => {
    console.log('Rendering button -', children)
    return (
        <button onClick={handleClick}>
            {children} {/*  -----------------------------------------------------------------------------------------------
              innertext. props.children refers to the increment age TEXT in parent component
            --------------------------------------------------------------------------------------------------- */}
        </button>
    );
};

export default Button;

// ------------------------- //

// Count component
import React from 'react';

const Count = ({ text, count }) => {
    console.log(`Rendering ${text} - ${count}`)
    return (
        <div>
            {text} - {count}
        </div>
    );
};

export default Count;
```

Performance: Nella console del browser al primo refresh abbiamo i 5 componenti renderizzati:
```
Rendering Title

Count.js:4 Rendering Age - 25

Button.js:4 Rendering button - Increment Age

Count.js:4 Rendering Salary - 50000

Button.js:4 Rendering button - Increment Salary
```
Ogniqualvolta però clicco su un bottone vengono ri-renderizzati tutti e 5 i componenti. Questo potrebbe risultare un approccio poco performante nel caso in uno dei componenti dovessero esserci funzioni che eseguono calcoli comlpessi.

Ecco noi dobbiamo evitare che quando viene cliccato per esempio un bottone vengano ri-renderizzati anche tutti gli alri componenti ma venga ri-renderizzato solo il componente che ha subito un cambiamento di stato.

Soluzione: useCallback()

In ParentComponent.js:
```js
import React, { useCallback, useState } from 'react';
import Count from './Count'
import Button from './Button'
import Title from './Title'


const ParentComponent = () => {
    const [age, setAge] = useState(25)
    const [salary, setSalary] = useState(50000)

    const incrementAge = useCallback(() => {
        setAge(age + 1)
    }, [age])

    const incrementSalary = useCallback(() => {
        setSalary(salary + 1000)
    }, [salary])

    return (
        <div>
            <Title />
            <Count text='Age' count={age} />
            <Button handleClick={incrementAge}>Increment Age</Button>
            <Count text='Salary' count={salary} />
            <Button handleClick={incrementSalary}>Increment Salary</Button>
        </div>
    );
};

export default ParentComponent;
```
E nei 3 componenti figli dopo l'export aggiungo React.memo(nomeComponente):
```js
//Button component
import React from 'react';

const Button = ({ handleClick, children }) => {
    console.log('Rendering button -', children)
    return (
        <button onClick={handleClick}>
            {children} {/*  -----------------------------------------------------------------------------------------------
              innertext. props.children refers to the increment age TEXT in parent component
            --------------------------------------------------------------------------------------------------- */}
        </button>
    );
};

export default React.memo(Button);

// ---------------- //

//Count component
import React from 'react';

const Count = ({ text, count }) => {
    console.log(`Rendering ${text} - ${count}`)
    return (
        <div>
            {text} - {count}
        </div>
    );
};

export default React.memo(Count);

// ---------------- //

//Title component
import React from 'react';

const Title = () => {
    console.log('Rendering Title');
    return (
        <h2>
            useCallback Hook
        </h2>
    );
};

export default React.memo(Title);
```
In questo modo quando clicco su uno dei due bottoni non verranno ri-renderizzati tutti i componenti, ma solo quelli che hanno subito un cambiamento di stato. Questo perchè a useCallback ho passato il parametro che potrebbe cambiare come dipendenza e quindi se il parametro passato non cambia il componente non verrà ri-renderizzato.