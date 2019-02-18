import React, { Component } from 'react';
import PublicHeader from '@/components/header/header';
import './home.less';
export default class Home extends Component {
    render(){
        return(
            <main>
                <PublicHeader title='首页' record />
                <article>
                    <h2>介绍</h2>
                </article>
            </main>
        )
    }
}