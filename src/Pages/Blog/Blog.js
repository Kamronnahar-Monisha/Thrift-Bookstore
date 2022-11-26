import React from 'react';
import './Blog.css';

const Blog = () => {
    return (
        <div className='blog '>
            <div className="container">
                <div className="rounded theme-color-shadow p-5 w-75 mx-auto text-center my-5">
                    <h4 className='theme-color mb-4'>What are the different ways to manage a state in a React application?</h4>
                    <p className='text-muted text-justify'>
                        With React, you will not modify the UI from code directly. For example, you will not write commands like “disable the button”, “enable the button”, “show the success message”, etc. Instead, you will describe the UI you want to see for the different visual states of your component “initial state”, “typing state”, “success state”, and then trigger the state changes in response to user input. This is similar to how designers think about UI.
                    </p>
                </div>
                <div className="rounded theme-color-shadow p-5 w-75 mx-auto text-center my-5">
                    <h4 className='theme-color mb-4'>How does prototypical inheritance work?</h4>
                    <p className='text-muted text-justify'>
                        The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object.
                    </p>
                </div>
                <div className="rounded theme-color-shadow p-5 w-75 mx-auto text-center my-5">
                    <h4 className='theme-color  mb-4'>What is a unit test? Why should we write unit tests?</h4>
                    <p className='text-muted text-justify'>
                        The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                    </p>
                </div>
                <div className="rounded theme-color-shadow p-5 w-75 mx-auto text-center my-5">
                    <h4 className='theme-color mb-4'> React vs. Angular vs. Vue?</h4>
                    <p className='text-muted text-justify'>
                        Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Blog;