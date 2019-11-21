import styled from "styled-components";
import arrow from './images/searchArrow.png';

export const Header = styled.header`
    align-items: center;
    background-color: #FEE87C;
    border-bottom: 1px solid rgba(0,0,0, .8);
    display: flex;
    height: 50px;
    padding: 0em 1.2em;
    p {
        color: black;
        font-size: 18px;
        font-weight: 600;
    }
`

export const SearchBar = styled.div`
        left: 1.1em; 
        max-width: 360px;
        position: absolute;
        top: 63px; 
        width: 91%;
        .search_input_wrapper {
            background: url(${arrow}) center right 12px/22px no-repeat;
            background-color: #fff;
            box-shadow: 0 0 5px 0 rgba(126,126,126,0.5);
            width: 100%;
        }
        input {
            background: transparent;
            border: none;
            font-size: 16px;
            padding: 1.15em; 
            width: 90%;
        }
        input::placeholder {
            color: #606060;
            font-family: 'Roboto',sans-serif;
            font-size: 16px;
        }  
        .search_dropdown {   
            background: white;
            max-width: 100%;
            top: -.1em;
            width: 100%;
        }
        .search_dropdown.visible {
            padding: 1.1em 1.5em 1em .7em;
        }
        .dropdown_suggestion {
            background: transparent;
            cursor: pointer;
            padding: .4em 0;
            transform: translate(7px);
            p {
                transition: color .2s ease;
            }
        }
        .dropdown_suggestion:hover {
            p {
                color: #67A6FF;
            }
        }       
`

export const Map = styled.div`
        main {
            height: calc(100vh - 50px);
            #map {
                height: 100%;
                width: 100%;
            }
        }
`

export const InfoBox = styled.div`
    background: white;
    bottom: 13px;  
    box-shadow: 0 0 5px 0 rgba(126,126,126,0.5);
    left: 1.1em;    
    max-width: 360px;
    width: 91%;
    padding: 1.3em 1.15em 1.3125em;
    position: absolute;
    .infobox_title {
        font-size: 1.5em;
        font-weight: 600;
        margin: 0 0 .4em;
    }
    .infobox_hours {
        font-size: 1.25em;
        margin-bottom: .75em;
    }
    .infobox_street, .infobox_address {
        font-size: .75em;
        line-height: 1.33em;
    }
    .close_info {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: .8em;
    }
`