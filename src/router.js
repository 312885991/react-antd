import React from 'react';
import App from './App';
import Basic from './pages/basic'
import Buttons from './pages/basic/ui/buttons'
import Modals from './pages/basic/ui/modals'
import Loading from './pages/basic/ui/loading'
import Home from './pages/basic/home'
import Notification from './pages/basic/ui/notification'
import Messages from './pages/basic/ui/messages'
import Carouserl from './pages/basic/ui/carousel'
import Login from './pages/basic/form/login'
import Register from './pages/basic/form/register'
import LowTable from './pages/basic/table/low'
import HighTable from './pages/basic/table/high'
import Rich from './pages/basic/rich'
import Bar from './pages/basic/charts/bar'
import Pie from './pages/basic/charts/pie'
import Line from './pages/basic/charts/line'
import Gallery from './pages/basic/gallery'
import Order from './pages/basic/order'
import User from './pages/basic/user'
import Permission from './pages/basic/permission'
import NotFound from './pages/basic/components/404'
import Tabs from './pages/basic/ui/tabs'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './commom.less'

export default class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route path="/basic" render={()=>
                            <Basic>
                                <Switch>
                                    <Route path="/basic/home" component={Home} />
                                    <Route path="/basic/ui/button" component={Buttons} />
                                    <Route path="/basic/ui/modals" component={Modals} />
                                    <Route path="/basic/ui/loading" component={Loading} />
                                    <Route path="/basic/ui/notification" component={Notification} />
                                    <Route path="/basic/ui/messages" component={Messages} />
                                    <Route path="/basic/ui/tabs" component={Tabs} />
                                    <Route path="/basic/ui/carousel" component={Carouserl} />
                                    <Route path="/basic/form/login" component={Login} />
                                    <Route path="/basic/form/register" component={Register} />
                                    <Route path="/basic/table/low" component={LowTable} />
                                    <Route path="/basic/table/high" component={HighTable} />
                                    <Route path="/basic/gallery" component={Gallery} />
                                    <Route path="/basic/rich" component={Rich} />
                                    <Route path="/basic/charts/bar" component={Bar} />
                                    <Route path="/basic/charts/pie" component={Pie} />
                                    <Route path="/basic/charts/line" component={Line} />
                                    <Route path="/basic/order" component={Order} />
                                    <Route path="/basic/user" component={User} />
                                    <Route path="/basic/permission" component={Permission} />
                                    <Route path="/basic/*" component={NotFound} />
                                </Switch>
                            </Basic>
                        } />
                        <Redirect from="/" to="/basic/home" />
                    </Switch>
                </App>
            </BrowserRouter>
        )
    }
}

