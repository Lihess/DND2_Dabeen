import produce from "immer";
import { createAction } from '../utils/actionFunction';
import { removeCookie } from '../utils/cookieFunction';

export const initialState = {
  me: {
    userNum: undefined, // 유저번호
    userId: undefined, 
    userName: undefined,
    email: undefined,
    introduce : "",
    birthDate: undefined,
    nickName: undefined,
    address: undefined,
    phoneNumber: undefined,
    userRole: "", // 다비너 여부  'y' 공급자

    // 공급자일 경우 필수
    picPath: undefined, // 프로필사진 주소
    avgRate: undefined, // 평점 평균
    ownMilege: undefined // 소유 마일리지

  },// 유저정보를 저장해야함.

  selectUser: {
    userNum: undefined, // 유저번호
    userId: undefined, 
    userName: undefined,
    email: undefined,
    introduce : "",
    birthDate: undefined,
    nickName: undefined,
    address: undefined,
    phoneNumber: undefined,
    blonSggName : undefined, // 소속시군구명
    userRole: "", // 다비너 여부

    // 공급자일 경우 필수
    picPath: undefined, // 프로필사진 주소
    // 생각해보니 주민 사진은 우리는 필요없다.
    avgRate: undefined, // 평점 평균
    ownMilege: undefined // 소유 마일리지

  },// 유저정보를 저장해야함.
  isLoggingOut: false, // 로그아웃 시도중
  logoutError: "", // 로그아웃 실패 사유
  isLoggingIn: false, // 로그인 시도중
  isLoginSuccess: false, // 로그인 성공 여부
  loginError: "", // 로그인 실패 사유
  isSigningup: false, //회원가입 시도중
  signUpSuccess : false, // 회원가입 성공 여부
  signUpError: "", // 회원 가입 실패
  isUpdatingInfo: false, // 정보 업데이트중
  updateError: "",
  loadUserError : "",

  applyDabeenerSuccess: false,
  isRefunding : false,
  refundError : ''
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"; // 액션의 이름
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"; // 서버쪽에 갔다 와야 하는 비동기 액션
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const EDIT_USERINFO_REQUEST = "EDIT_USERINFO_REQUEST";
export const EDIT_USERINFO_SUCCESS = "EDIT_USERINFO_SUCCESS";
export const EDIT_USERINFO_FAILURE = "EDIT_USERINFO_FAILURE";

export const APPLY_DABEENER_REQUEST = "APPLY_DABEENER_REQUEST";
export const APPLY_DABEENER_SUCCESS = "APPLY_DABEENER_SUCCESS";
export const APPLY_DABEENER_FAILURE = "APPLY_DABEENER_FAILURE";

export const REFUND_MILEAGE_REQUEST = "REFUND_MILEAGE_REQUEST";
export const REFUND_MILEAGE_SUCCESS = "REFUND_MILEAGE_SUCCESS";
export const REFUND_MILEAGE_FAILURE = "REFUND_MILEAGE_FAILURE";


// 회원가입 : data를 가지고 서버에 회원가입 요청을 날린다 -> 성공한다 : 회원가입 끝 OR 실패한다 : 에러 이유
export const signUpRequestAction = createAction(SIGN_UP_REQUEST);
export const signUpSuccessAction = createAction(SIGN_UP_SUCCESS);
export const signUpFailureAction = createAction(SIGN_UP_FAILURE);

// id, password를 가지고 로그인 요청을 서버로 보낸다. -> 성공한다 : 유저 정보 저장  or 실패한다 : 에러 이유
export const loginRequestAction = createAction(LOG_IN_REQUEST);
export const loginSuccessAction = createAction(LOG_IN_SUCCESS);
export const loginFailureAction = createAction(LOG_IN_FAILURE);

// 회원 정보를 바탕으로 서버에 로그아웃 요청을 보낸다 -> 성공한다 : 유저 정보 null로 or 실패한다 : 에러 이유
export const logoutRequestAction = createAction(LOG_OUT_REQUEST);
// export const logoutSuccessAction = createAction(LOG_OUT_SUCCESS);
// export const logoutFailureAction = createAction(LOG_OUT_FAILURE);

export const loadUserRequestAction = createAction(LOAD_USER_REQUEST);
export const loadUserSuccessAction = createAction(LOAD_USER_SUCCESS);
export const loadUserFailureAction = createAction(LOAD_USER_FAILURE);
// 자신 정보 수정을 보낸다 -> 성공한다 : 유저정보 불러와서 다시 저장 or 실패한다 : 에러
export const editUserInfoRequestAction = createAction(EDIT_USERINFO_REQUEST);
export const editUserInfoSuccessAction = createAction(EDIT_USERINFO_SUCCESS);
export const editUserInfoFailureAction = createAction(EDIT_USERINFO_FAILURE);

export const applyDabeenerRequestAction = createAction(APPLY_DABEENER_REQUEST);
export const applyDabeenerSuccessAction = createAction(APPLY_DABEENER_SUCCESS);
export const applyDabeenerFailureAction = createAction(APPLY_DABEENER_FAILURE);

export const refundMileageRequestAction = createAction(REFUND_MILEAGE_REQUEST);
export const refundMileageSuccessAction = createAction(REFUND_MILEAGE_SUCCESS);
export const refundMileageFailureAction = createAction(REFUND_MILEAGE_FAILURE);

// 자신 정보 수정을 보낸다 -> 성공한다 : 유저정보 불러와서 다시 저장 or 실패한다 : 에러

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.isLoggingIn = true;
        draft.loginError = '';
        draft.isLoginSuccess = false;
        break;
      }
      case LOG_IN_SUCCESS: { // 로그인 토큰이 내려온다 -> 토큰 local 또는 session에 저장하고 토큰 해석해서 id 저장.
        draft.isLoggingIn = false;
        draft.isLoginSuccess = true;
        draft.me.userNum = action.data.userNum;
        draft.me.userId = action.data.userId;
        draft.me.userRole = action.data.role;
        draft.me.nickName = action.data.nickname;
        // 토큰 해석해서 userId, userNum 저장하는 방식!!
        // 토큰에 여러개 정보 다 들어 있을지 아니면 한번더 불러야 하는지
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false;
        draft.isLoginSuccess = false;
        draft.loginError = action.data.data.description;
        break;
      }
      case LOG_OUT_REQUEST: {
         // draft.userInfo = null;
        // 로그아웃 성공 했을 때 토큰 삭제
        removeCookie();
        draft.me = {};
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.isSigningup = true;
        draft.signUpError = "";
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.isSigningup = false;
        draft.signUpSuccess = true;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSigningup = false;
        draft.signUpError = action.data;
        break;
      }
      case EDIT_USERINFO_REQUEST: {
        draft.isUpdatingInfo = true;
        draft.updateError = "";
        break;
      }
      case EDIT_USERINFO_SUCCESS: {
        draft.isUpdatingInfo = false;
        // draft.userInfo = action.data;
        // 임시로 redux만 수정
        draft.me.nickName = action.data.nickname;
        draft.me.email = action.data.email;
        draft.me.phoneNumber = action.data.phoneNum;
        draft.me.address = action.data.address;
        draft.me.introduce = action.data.introduce;
        draft.me.picPath = action.data.picPath;
        break;
      }
      case EDIT_USERINFO_FAILURE: {
        draft.isUpdatingInfo = false;
        draft.updateError = action.data.error;
        break;
      }
      case LOAD_USER_REQUEST : {
        break;
      }
      case LOAD_USER_SUCCESS : {
        if (action.data.isMe) {
          draft.me.userNum = action.data.info.user_num;
          draft.me.userName = action.data.info.user_name;
          draft.me.userId = action.data.info.user_id;
          draft.me.nickName = action.data.info.nickname;
          draft.me.email = action.data.info.email;
          draft.me.birthDate = action.data.info.birth_date;
          draft.me.introduce = action.data.info.itdc_cont;
          draft.me.address = action.data.info.address;
          draft.me.phoneNumber = action.data.info.phone_num;

          draft.me.userRole = action.data.info.suppl_whet;
          draft.me.picPath = action.data.info.pic_path;
          draft.me.avgRate = action.data.info.avg_rate;
          draft.me.ownMilege = action.data.info.own_mileage || 0;
        }
        else {
          draft.selectUser.userNum = action.data.info.user_num;
          draft.selectUser.userName = action.data.info.user_name;
          draft.selectUser.userId = action.data.info.user_id;
          draft.selectUser.nickName = action.data.info.nickname;
          draft.selectUser.email = action.data.info.email;
          draft.selectUser.birthDate = action.data.info.birth_date;
          draft.selectUser.introduce = action.data.info.itdc_cont;
          draft.selectUser.address = action.data.info.address;
          draft.selectUser.phoneNumber = action.data.info.phone_num;

          draft.selectUser.userRole = action.data.info.suppl_whet;
          draft.selectUser.picPath = action.data.info.pic_path;
          draft.selectUser.avgRate = action.data.info.avg_rate;
        }
        break;
      }
      case LOAD_USER_FAILURE : {
        draft.loadUserError = action.data;
        break;
      }
      case APPLY_DABEENER_REQUEST : {
        draft.isUpdatingInfo = true;
        draft.updateError = '';
        draft.applyDabeenerSuccess = false;
        break;
      }
      case APPLY_DABEENER_SUCCESS : {
        draft.isUpdatingInfo = false;
        draft.me.userRole = action.data.suppl_whet;
        draft.me.picPath = action.data.pic_path;
        draft.applyDabeenerSuccess = true;
        break;
      }
      case APPLY_DABEENER_FAILURE : {
        draft.isUpdatingInfo = false;
        draft.updateError = action.data;
        draft.applyDabeenerSuccess = false;
        break;
      }
      case REFUND_MILEAGE_REQUEST : {
        draft.isRefunding = true;
        draft.refundError = '';
        break;
      }
      case REFUND_MILEAGE_SUCCESS : {
        draft.isRefunding = false;
        draft.me.ownMilege -= action.data;
        break;
      }
      case REFUND_MILEAGE_FAILURE : {
        draft.isRefunding = false;
        draft.refundError = action.data;
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
