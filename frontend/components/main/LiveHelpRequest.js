import React from 'react';
import styled from 'styled-components';
import { Divider, Avatar } from 'antd';

const LiveHelpRequestForm = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 40px;
`;

const LiveHelpRequestContent = styled.div`
    border: solid 1px gray;
    border-radius: 5px;
    width: 350px;
    height: 240px;

    & > .liveHelpRequestUserInfo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -37px;
        margin-left: -30px;
        margin-bottom: 5px;
    }

    & .liveHelpRequestID {
        color: black;
        margin-right: 8px;
    }

    & .liveHelpRequestNickname {
        color: darkgray;
        font-size: 11px;
    }
`;

const LiveHelpRequestContentInfo = styled.div`
    color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1vh;

    & > .titleDate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 280px;
    }

    & > .location {
        border-top: solid 1px gray;
        text-align: right;
        width: 280px;
    }
`;

const LiveHelpRequest = () => {
    return (
        <LiveHelpRequestForm>
            <div>
                <LiveHelpRequestContent>
                    이부분은 사진이 들어갈 예정입니다.
                    <Divider orientation="left" style={{marginTop: '15vh'}}><Avatar size={55} icon="user"/></Divider>
                    <div className="liveHelpRequestUserInfo">
                        <div className="liveHelpRequestID">아이디</div>
                        <div className="liveHelpRequestNickname">@닉네임</div>
                    </div>
                </LiveHelpRequestContent>
                <LiveHelpRequestContentInfo>
                    <div className = "titleDate">
                        <h3>제목</h3>
                        <div>2020년 3월 8일</div>
                    </div>
                    <div className = "location">부산광역시 남구 대연동</div>
                </LiveHelpRequestContentInfo>
            </div>
            <div>
                <LiveHelpRequestContent>
                    이거 왜 space-around 설정이 안될까요 ㅠ.ㅠ
                    <Divider orientation="left" style={{marginTop: '15vh'}}><Avatar size={55} icon="user"/></Divider>
                    <div className="liveHelpRequestUserInfo">
                        <div className="liveHelpRequestID">아이디</div>
                        <div className="liveHelpRequestNickname">@닉네임</div>
                    </div>
                </LiveHelpRequestContent>
                <LiveHelpRequestContentInfo>
                    <div className = "titleDate">
                        <h3>제목</h3>
                        <div>2020년 3월 29일</div>
                    </div>
                    <div className = "location">부산광역시 남구 대연동</div>
                </LiveHelpRequestContentInfo>
            </div>
            <div>
                <LiveHelpRequestContent>
                    이거 디자인한 사람 누군데 당장 나온나.
                    <Divider orientation="left" style={{marginTop: '15vh'}}><Avatar size={55} icon="user"/></Divider>
                    <div className="liveHelpRequestUserInfo">
                        <div className="liveHelpRequestID">아이디</div>
                        <div className="liveHelpRequestNickname">@닉네임</div>
                    </div>
                </LiveHelpRequestContent>
                <LiveHelpRequestContentInfo>
                    <div className = "titleDate">
                        <h3>제목</h3>
                        <div>2020년 6월 19일</div>
                    </div>
                    <div className = "location">부산광역시 남구 대연동</div>
                </LiveHelpRequestContentInfo>
            </div>
        </LiveHelpRequestForm>
    );
};

export default LiveHelpRequest;