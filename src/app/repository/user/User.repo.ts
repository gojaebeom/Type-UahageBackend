import { queryBuilder } from "../../../config/Database";
import log from "../../../config/Logger";

// 회원가입
export const store = (
    email: any, 
    nickname=null,
    ageGroupType=null,
    babyGender=null,
    babyBirthday=null,
) => {
    const query = `
    with users as ( 
        insert into users( 
            email, 
            nickname 
        )
        values( 
            ${ email === null ? null : "'"+email+"'" }, 
            ${ nickname === null ? null : "'"+nickname+"'"} 
        ) 
        returning id 
    ) 
    insert into user_details(
        user_id, 
        age_group_type, 
        baby_gender, 
        baby_birthday
    ) 
    values (
        (select id from users), 
        ${ageGroupType}, 
        ${babyGender === null ? null : "'"+babyGender+"'"}, 
        ${babyBirthday === null ? null : "'"+babyBirthday+"'"}
    );
    `;
    log.info(query);
    return queryBuilder( query, null )
    .then( data => ({ success: true,  message: "User store success", result : data }))
    .catch( error => ({ success: false, message: "User store false", error : error }));
}

// 회원 정보 수정 ( 첫 회원가입 이후 추가 정보 입력에도 사용 )
export const edit = ( 
    userId: any,
    nickname="", 
    ageGroupType=6, 
    babyGender="", 
    babyBirthday="" 
) => {
    const query = `
    with users as (
        update users
        set nickname = '${nickname}'
        where id = ${userId}
        returning id
    )
    update user_details as ud
    set age_group_type = ${ageGroupType}, baby_gender= '${babyGender}', baby_birthday = '${babyBirthday}'
    where ud.user_id = (select id from users);
    `;
    log.info(query);
    return queryBuilder( query, null )
    .then( data => ({ success: true, message: "User update success", result : true }))
    .catch( error => ({ success: false, message: "User update false", error : error }));
}

// 회원 프로필 이미지 생성
export const storeImage = ( userId: any, imagePath: any ) => {
    const query = `
    insert into user_images(user_id, image_path)
    values( ${userId}, '${imagePath}' );
    `;
    return queryBuilder( query , null)
    .then( data => ({ success: true, message: "User Image store success", result : true }))
    .catch( error => ({ success: false, message: "User Iamge store false", error : error }));
}

// 회원 프로필 이미지 수정
export const editImage = ( userId: any, imagePath: any ) => {
    const query = `
    update user_images
    set image_path = ${ imagePath ? "'"+imagePath+"'" : null }
    where user_id = ${userId};
    `;
    log.info(query);
    return queryBuilder( query, null )
    .then( data => ({ success: true, message: "User Image update success", result : true }))
    .catch( error => ({ success: false, message: "User Image update false", error : error }));
}


// 닉네임 중복 확인
export const validateByNickname = ( nickname: any ) => {
    const query = `
    select id
    from users
    where nickname = '${nickname}';
    `;
    return queryBuilder( query, null )
    .then( (data: any) => ({ success: true, message: "User Nickname validate success", result : data.rowCount !== 0 ? false : true }))
    .catch( error => ({ success: false, message: "User Nickname validate false",  error : error }));
}

// 이메일 확인
export const validateByEmail = ( email: any ) => {
    const query = `
    select id
    from users
    where email = '${ email }';
    `;
    return queryBuilder( query, null )
    .then( (data: any) => ({ success: true, message: "User email validate success", result : data.rowCount !== 0 ? false : true }))
    .catch( error => ({ success: false, message: "User email validate false", error : error }));
}

// 회원 아이디로 image 여부확인
export const validateImageById = ( userId: any ) => {
    const query = `
    select count(ui.id)
    from users as u
    left outer join user_images as ui
    on u.id = ui.user_id
    where u.id = ${userId};
    `;
    return queryBuilder( query, null )
    .then( (data: any) => {
        return { success: true, message: "User image validate success", result : data.rows[0].count === '0' ? false : true }
    })
    .catch( error => ({ success: false, message: "User image validate false", result: false, error : error }));
}

// 이미지 주소 최신꺼 하나 가져오기
export const findImagePath = ( userId: any ) => {
    const query = `
    select ui.image_path from users as u
    left join user_images ui on u.id = ui.user_id
    where u.id = ${ userId }
    order by ui.created_at
    limit 1 offset 0;
    `;
    return queryBuilder( query, null )
    .then( (data: any) => ({ success: true, message: "find User image success", result: data.rows }))
    .catch( error => ({ success: false, message: "find User image false",  error: error }));
}

// 이메일 값으로 id 찾기 ( 미사용 )
export const findIdByEmail = ( email: any ) => {
    const query = `
    select id
    from users
    where email = '${email}';
    `;
    return queryBuilder( query, null )
    .then( (data: any) => ({ success: true, message: "find User email success", result : data.rowCount !== 0 ? data.rows[0] : 0 }))
    .catch( error => ({ success: false, message: "find User email false", error : error }));
}

// 회원 상세정보
export const findOne = ( userId: any ) => {
    const query = `
    select ui.image_path, u.nickname, ud.age_group_type, ud.baby_gender, ud.baby_birthday
    from users as u
    left outer join user_details as ud
    on u.id = ud.user_id
    left outer join user_images as ui
    on u.id = ui.user_id
    where u.id = ${userId}
    order by  ui.created_at desc
    limit 1 offset 0;
    `;
    return queryBuilder( query, null)
    .then( (data: any) => ({ success: true, message: "find User detail success", result : data.rows[0] }))
    .catch( error => ({ success: false, message: "find User detail false", error : error }));
}

// 회원 탈퇴
export const deleteStepOne = ( userId: any ) => {
    const query = `
    delete from users where id = ${userId};
    `;
    return queryBuilder( query, null )
    .then( data => ({ success: true, message: "delete User success", result : true }))
    .catch( error => ({ success: false, message: "delete User false", error : error }));
}


