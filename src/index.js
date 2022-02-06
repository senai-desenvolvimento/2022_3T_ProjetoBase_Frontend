import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';

import './index.css';

import Home from './pages/home/App';
import Login from './pages/login/login';

import Usuario from './pages/usuario/usuario';
import NotFound from './pages/notFound/NotFound';

import Patrimonio from './pages/patrimonio/patrimonio';

const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

// const PermissaoComum = ({ component: Component }) => (
//   <Route
//     render={(props) =>
//       usuarioAutenticado() && parseJwt().role === '2' ? (
//         // operador spread
//         <Component {...props} />
//       ) : (
//         <Redirect to="login" />
//       )
//     }
//   />
// );

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} /> {/* Home */}
        <Route path="/login" component={Login} /> {/* Login */}
        <PermissaoAdm path="/patrimonio" component={Patrimonio} /> {/* Patrimonio */}
        <PermissaoAdm path="/usuario" component={Usuario} /> {/* Tipos Usuários */}
     
        <Route path="/notFound" component={NotFound} /> {/* Not Found */}
        <Redirect to="/notFound" /> {/* Redireciona para Not Found caso não encontre nenhuma rota */}
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));


