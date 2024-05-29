const express = require('express');
const { SelfTestResults } = require('../models');// index는 파일 이름 생략 가능 

const router = express.Router();

// Self Test Result 저장하기
router.post('/:diary_id', async (req, res) => {
  try {
    const selfTestResult = await SelfTestResults.create({
      diaryId : req.params.diary_id,
      ...req.body
    });
    return res.status(201).json(selfTestResult.dataValues);
  } catch(err) {
    console.error(err)
    return res.status(500).json( { "message" : "셀프 체크 테스트 결과 저장에 실패했습니다." } )
  }
})

// Self Test Result 불러오기
router.get('/:diary_id', async (req, res) => {
  try {
    const selfTestResult = await SelfTestResults.findOne({
      where: {
        diaryId : req.params.diary_id
      }
    });
    return res.status(200).json( selfTestResult.dataValues );
  } catch(err) {
    console.error(err)
    return res.status(500).json( { "message" : "셀프 체크 테스트 결과 불러오기에 실패했습니다." } )
  }
})

module.exports = router;