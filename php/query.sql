-- 1.x.x SELECT
-- 2.x.x INSERT UPDATE DELETE
-- 3.x.x CREATE ALTER TRUNCATE DROP

-- 登入
-- #BEGIN[1.1.1]
SELECT aid, a_name
FROM admin_user
WHERE a_acc = :acc AND a_pwd = sha2(:pwd, 256);
-- #END

-- 總攬 加總數據
-- #BEGIN[1.2.1]
SELECT (
SELECT SUM(IFNULL(op_qnt, 0) * price)
FROM open_list ol
LEFT JOIN order_pro op
ON ol.ol_id = op.ol_id
LEFT JOIN personal_price pp
ON pp.ol_id = op.ol_id AND pp.gl_id = op.gl_id AND pp.lc_autonum = op.lc_autonum
WHERE ol_status = 2[WHERE]
) unsub
, SUM(c1) earn, SUM(c2) cost, SUM(c2 - c1) profit
FROM
(SELECT price, op_qnt * p_imprice c1, op_qnt * price c2
FROM order_pro op
LEFT JOIN list_cont lc
ON lc.gl_id = op.gl_id AND lc.lc_autonum = op.lc_autonum
LEFT JOIN personal_price pp
ON pp.ol_id = op.ol_id AND pp.gl_id = op.gl_id AND pp.lc_autonum = op.lc_autonum
LEFT JOIN open_list ol
ON ol.ol_id = op.ol_id
WHERE ol_status != 2[WHERE]) t1;
-- #END

-- 總攬 排名
-- #BEGIN[1.2.2]
SELECT gl_name, p_name, p_imprice, p_offprice, IFNULL(qnt, 0) qnt, (p_offprice - p_imprice) * IFNULL(qnt, 0) profit
FROM list_cont lc
LEFT JOIN group_list gl
ON gl.gl_id = lc.gl_id
LEFT JOIN 
(SELECT ol_id, gl_id, lc_autonum, SUM(op_qnt) qnt
FROM order_pro
GROUP BY ol_id, gl_id, lc_autonum) t1
ON t1.gl_id = lc.gl_id AND t1.lc_autonum = lc.lc_autonum
LEFT JOIN open_list ol
ON ol.ol_id = t1.ol_id
[WHERE]
ORDER BY profit DESC
LIMIT 10;
-- #END

-- #BEGIN[1.2.3]
SELECT uid, m_name, m_phone
FROM members;
-- #END

-- 意見與回饋
-- #BEGIN[1.3.1]
SELECT pw_id, DATE_FORMAT(pw_time, '%m/%d/%Y %H:%i') pw_time, m_name, pw_destxt
FROM pro_wish pw
LEFT JOIN members m
ON m.uid = pw.uid;
-- #END

-- 查看圖片
-- #BEGIN[1.3.2]
SELECT pw_id, DATE_FORMAT(pw_time, '%m/%d/%Y %H:%i') pw_time, m_name, pw_destxt, pw_picpath
FROM pro_wish pw
LEFT JOIN members m
ON m.uid = pw.uid
WHERE pw_id = :pid;
-- #END

-- 待處理訂單(總攬)
-- ol_trafyes, payyes 0: 完成付款 非0: 未完成付款
-- ol_status 0:結單 1:處理中
-- #BEGIN[1.4.1]
SELECT ol.ol_id, DATE(ol_time) otime, m_name, ol_trafyes, ol_orderyes, ol_name, IFNULL(SUM(price * op_qnt), 0) amount
FROM open_list ol
LEFT JOIN members m
ON m.uid = ol.uid
LEFT JOIN order_pro op
ON op.ol_id = ol.ol_id
LEFT JOIN personal_price pp
ON pp.ol_id = op.ol_id AND pp.gl_id = op.gl_id AND pp.lc_autonum = op.lc_autonum
WHERE ol_status = 1
GROUP BY ol.ol_id, otime, m_name, ol_trafyes, ol_name;

-- #END

-- 取消訂單(總攬)
-- #BEGIN[1.4.2]
SELECT ol.ol_id, DATE(ol_time) otime, m_name, ol_name, IFNULL(SUM(price * op_qnt), 0) amount
FROM open_list ol
LEFT JOIN members m
ON m.uid = ol.uid
LEFT JOIN order_pro op
ON op.ol_id = ol.ol_id
LEFT JOIN personal_price pp
ON pp.ol_id = op.ol_id AND pp.gl_id = op.gl_id AND pp.lc_autonum = op.lc_autonum
WHERE ol_status = 2
GROUP BY ol.ol_id, otime, m_name, ol_trafyes, ol_name;
-- #END

-- 訂單-查看-上半部
-- 公司是甚麼?廠商?不知道所以沒查
-- #BEGIN[1.4.3]
SELECT ol_status, ol.ol_id, ol_name, DATE(ol_time) oldate, m_name, ol_orderyes, ol_trafyes, m_add, m_phone, m_note, substring(b_acc , -5, 5) b_acc, SUM(p_imprice* op_qnt) p_cost, SUM(price* op_qnt) p_earn, SUM((price - p_imprice) * op_qnt) p_profit
FROM open_list ol
LEFT JOIN members m
ON m.uid = ol.uid
LEFT JOIN personal_price pp
ON pp.ol_id = ol.ol_id
LEFT JOIN order_pro op
ON op.ol_id = pp.ol_id AND op.gl_id = pp.gl_id AND op.lc_autonum = pp.lc_autonum
LEFT JOIN list_cont lc
ON lc.gl_id = pp.gl_id AND lc.lc_autonum = pp.lc_autonum
WHERE ol.ol_id = :ol_id 
GROUP BY ol.ol_id, oldate, m_name, ol_orderyes, ol_trafyes;
-- #END

-- 訂單-查看-下半表格
-- #BEGIN[1.4.4]
SELECT p_name, op_qnt, p_imprice, price, (op_qnt * p_imprice) im_tot, (op_qnt * price) price_tot
FROM list_cont lc
LEFT JOIN personal_price pp
ON lc.gl_id = pp.gl_id AND lc.lc_autonum = pp.lc_autonum
LEFT JOIN order_pro op
ON op.ol_id = pp.ol_id AND op.gl_id = pp.gl_id AND op.lc_autonum = pp.lc_autonum
WHERE pp.ol_id = :ol_id;
-- #END

-- 取消訂單
-- #BEGIN[2.4.1]
UPDATE open_list
SET ol_status = 2, ol_note = :ol_note
WHERE ol_id = :ol_id;
-- #END

-- 待處理訂單-彈出視窗資訊
-- #BEGIN[1.4.5]
SELECT DISTINCT ol.ol_id, m.m_name, ol_name, SUBSTRING(manu.b_acc, -5, 5) AS b_acc, ol_orderyes, ol_trafyes
FROM open_list ol
LEFT JOIN members m
ON m.uid = ol.uid
LEFT JOIN personal_price pp
ON pp.ol_id = ol.ol_id
LEFT JOIN list_cont lc
ON lc.gl_id = pp.gl_id AND lc.lc_autonum = pp.lc_autonum
LEFT JOIN goods g
ON g.gid = lc.gid
LEFT JOIN manufacturer manu
ON manu.m_id = g.m_id
WHERE ol.ol_id = :ol_id;
-- #END

-- 待處理訂單-帳務確認 
-- #BEGIN[2.4.2]
UPDATE open_list
SET ol_trafyes = 1
WHERE ol_id = :ol_id;
-- #END

-- 待處理訂單-訂單確認
-- #BEGIN[2.4.3]
UPDATE open_list
SET ol_orderyes = 1
WHERE ol_id = :ol_id;
-- #END

-- 待處理訂單-完成訂單
-- #BEGIN[2.4.4]
UPDATE open_list
SET ol_status = 0
WHERE ol_id = :ol_id;
-- #END


-- 小販總攬
-- #BEGIN[1.5.1]
SELECT m.uid, DATE(join_date) join_date, m_name, m_phone, m_status, DATE(ol_time) latest, mt.tname
FROM members m
LEFT JOIN member_tier mt
ON mt.tid = m.tid
LEFT JOIN (SELECT uid, MAX(ol_time) ol_time FROM open_list GROUP BY uid) ol
ON ol.uid = m.uid
ORDER BY latest DESC;
-- #END

-- 小販總攬-黑名單
-- #BEGIN[1.5.11]
SELECT m.uid, DATE(join_date) join_date, m_name, m_phone, m_status, DATE(ol_time) latest, mt.tname
FROM members m
LEFT JOIN member_tier mt
ON mt.tid = m.tid
LEFT JOIN (SELECT uid, MAX(ol_time) ol_time FROM open_list GROUP BY uid) ol
ON ol.uid = m.uid
WHERE m_status = 1
ORDER BY latest DESC;
-- #END

--個別小販資訊-上半部
-- #BEGIN[1.5.2]
SELECT m_status, m_name, DATE(join_date) join_date, m_phone, m_add, tname, b_code, b_acc, m_note
FROM members m
LEFT JOIN member_tier mt
ON mt.tid = m.tid
WHERE uid = :uid;
-- #END

-- 分類與備註更新
-- #BEGIN[2.5.1]
UPDATE members
SET tid = :tid, m_note = :m_note
WHERE uid = :uid;
-- #END

--個別小販資訊-下半部table
-- #BEGIN[1.5.22]
SELECT ol_time, ol_id, ol_name, SUM(imp_tot) imp_tot, SUM(pri_tot) pri_tot, SUM(pri_tot - imp_tot) profit, ol_orderyes, ol_trafyes
FROM
(SELECT DATE(ol_time) ol_time, ol.ol_id, ol_name, IFNULL(p_imprice * op_qnt, 0) imp_tot, IFNULL(price * op_qnt, 0) pri_tot, ol_orderyes, ol_trafyes
FROM open_list ol
LEFT JOIN personal_price pp
ON pp.ol_id = ol.ol_id
LEFT JOIN list_cont lc
ON lc.gl_id = pp.gl_id AND lc.lc_autonum = pp.lc_autonum
LEFT JOIN order_pro op
ON op.ol_id = pp.ol_id AND op.gl_id = pp.gl_id AND op.lc_autonum = pp.lc_autonum
WHERE uid = 'ROOT000001') t1
GROUP BY ol_time, ol_id, ol_name, ol_orderyes, ol_trafyes
ORDER BY ol_time DESC;
-- #END

-- 個別小販資訊-黑名單
-- #BEGIN[2.5.2]
UPDATE members
SET m_status = 1, m_note = :m_note
WHERE uid = :uid;
-- #END

-- 取消黑名單-黑單原因
-- #BEGIN[1.5.3]
SELECT m_note
FROM members
WHERE uid = :uid
-- #END

-- 取消黑名單
-- #BEGIN[2.5.3]
UPDATE members
SET m_status = 0, m_note = ''
WHERE uid = :uid;
-- #END

-- 新增小販
-- #BEGIN[2.5.4]
INSERT INTO members 
(uid, m_name, m_phone, m_add, join_date, b_code, b_acc, tid, m_note, m_acc, m_pwd)
VALUES
(:uid, :m_name, :m_phone, :m_add, :join_date, :b_code, :b_acc, :tid, :m_note, :m_acc, sha2(:m_pwd, 256)); 
-- #END

-- 小販階級-select
-- #BEGIN[1.5.4]
SELECT tid, tcode, tname, quantity
FROM member_tier;
-- #END

-- 小販階級-insert
-- #BEGIN[2.5.5]
INSERT INTO member_tier
(tcode, tname, quantity)
VALUES(:tcode, :tname, :quantity);
-- #END

-- 小販階級-update
-- #BEGIN[2.5.6]
UPDATE member_tier
SET tcode= :tcode, tname = :tname, quantity = :quantity
WHERE tid = :tid;
-- #END

-- 小販階級-delete
-- #BEGIN[2.5.7]
DELETE FROM member_tier
WHERE tid = :tid;
-- #END

-- 商品總攬-下架給JS篩選
-- 0下架 1上架 2暫停販售
-- #BEGIN[1.6.1]
SELECT DISTINCT g.gid, m_name, gname, ver, class, g_status, p_imprice, p_offprice
FROM goods g
LEFT JOIN manufacturer ma
ON ma.m_id = g.m_id
LEFT JOIN list_cont lc
ON lc.gid = g.gid;
-- #END

-- #BEGIN[1.6.11]
SELECT m_id, m_name
FROM manufacturer
WHERE m_status  = 1;
-- #END

-- 商品資訊-查看
-- #BEGIN[1.6.2]
SELECT g_status, ma.m_name, class, gname, ver, matdate, themosphere, place, img_path, stock, destxt
FROM goods g
LEFT JOIN manufacturer ma
ON ma.m_id = g.m_id
LEFT JOIN list_cont lc
ON lc.gid = g.gid
WHERE g.gid = :gid;
-- #END

-- 商品資訊-紀錄
-- #BEGIN[1.6.21]
SELECT gid, r_type, r_time, r_desc, a_name
FROM goods_record gr
LEFT JOIN admin_user au
ON au.aid = gr.aid
WHERE gid = :gid;
-- #END

-- 商品下架
-- #BEGIN[2.6.1]
UPDATE goods
SET g_status = 0
WHERE gid = :gid;
-- #END

-- 商品下架紀錄
-- #BEGIN[2.6.11]
INSERT INTO goods_record
(gid, r_type, r_desc, r_time, aid)
VALUES
(:gid, '商品下架', '商品下架', NOW(), :aid);
-- #END



-- 商品上架
-- #BEGIN[2.6.2]
UPDATE goods
SET g_status = 1
WHERE gid = :gid;
-- #END

-- 商品上架紀錄
-- #BEGIN[2.6.21]
INSERT INTO goods_record
(gid, r_type, r_desc, r_time, aid)
VALUES
(:gid, '商品上架', '商品上架', NOW(), :aid);
-- #END

-- 供分類頁與列表使用
-- 商品分類
-- #BEGIN[1.6.3]
SELECT tid, tcode, tname, quantity, note
FROM goods_tier;
-- #END

-- 商品分類
-- #BEGIN[1.6.31]
SELECT tid, tcode, tname, quantity, note
FROM goods_tier
WHERE tid = :tid;
-- #END

-- 價格設定
-- 群組價格設定不懂-先跳過
-- #BEGIN[2.6.3]
UPDATE list_cont
SET p_imprice = :p_imprice, p_offprice = :p_offprice
WHERE gid = :gid;
-- #END

-- 新增商品
-- #BEGIN[2.6.4]
INSERT INTO goods
(m_id, class, gname, ver, matdate, themosphere, place, img_path, stock, destxt, g_status) 
VALUES
(:m_id, :class, :gname, :ver, :matdate, :themosphere, :place, :img_path, :stock, :destxt, 1);
-- #END

-- 商品分類-修改
-- #BEGIN[2.6.5]
UPDATE goods_tier
SET tcode = :tcode, tname = :tname, note = :note
WHERE tid = :tid;
-- #END

-- 商品分類-新增
-- #BEGIN[2.6.6]
INSERT INTO goods_tier 
(tcode, tname, quantity, note) 
VALUES
(:tcode, :tname, :quantity, :note);
-- #END

-- 商品資訊-更新
-- #BEGIN[2.6.7]
UPDATE goods
SET class = :class, gname = :gname, ver = :ver, matdate = :matdate,
 themosphere = :themosphere, place = :place, img_path = :img_path, stock = :stock, destxt = :destxt
WHERE gid = :gid;
-- #END

-- 商品更新紀錄
-- #BEGIN[2.6.71]
INSERT INTO goods_record
(gid, r_type, r_desc, r_time, aid)
VALUES
(:gid, '資訊更新', '商品資訊更新', NOW(), :aid);
-- #END

-- 廠商總攬
-- #BEGIN[1.7.1]
SELECT m_id, m_name, tname, m_status, windows, phone, address, b_code, b_acc
FROM manufacturer ma
LEFT JOIN manu_tier mt
ON mt.tid = ma.tid;
-- #END

-- 廠商編輯-查看
-- #BEGIN[1.7.2]
SELECT m_id, m_name, tname, m_status, windows, phone, address, b_code, b_acc, pay_meth
FROM manufacturer ma
LEFT JOIN manu_tier mt
ON mt.tid = ma.tid
WHERE m_id = :m_id;
-- #END

-- 廠商編輯-儲存
-- #BEGIN[2.7.1]
UPDATE manufacturer
SET m_name = :m_name, windows = :windows, phone = :phone, address = :address, b_code = :b_code, b_acc = :b_acc, pay_meth = :pay_meth
WHERE m_id = :m_id;
-- #END

-- 廠商編輯-下架
-- #BEGIN[2.7.2]
UPDATE manufacturer
SET m_status = 0
WHERE m_id = :m_id;
-- #END

-- 廠商編輯-上架
-- #BEGIN[2.7.3]
UPDATE manufacturer
SET m_status = 1
WHERE m_id = :m_id;
-- #END

-- 新增廠商
-- #BEGIN[2.7.4]
INSERT INTO manufacturer 
(tid, m_status, m_name, windows, phone, address, b_code, b_acc, pay_meth)
VALUES 
(0, 1, :m_name, :windows, :phone, :address, :b_code, :b_acc, :pay_meth);
-- #END

-- 小販階級-select
-- #BEGIN[1.7.3]
SELECT tid, tcode, tname, quantity
FROM manu_tier;
-- #END


-- 小販階級-insert
-- #BEGIN[2.7.5]
INSERT INTO manu_tier
(tcode, tname, quantity)
VALUES(:tcode, :tname, :quantity);
-- #END

-- 小販階級-update
-- #BEGIN[2.7.6]
UPDATE manu_tier
SET tcode= :tcode, tname = :tname, quantity = :quantity
WHERE tid = :tid;
-- #END

-- 小販階級-delete
-- #BEGIN[2.7.7]
DELETE FROM manu_tier
WHERE tid = :tid;
-- #END

-- 販團總攬
-- #BEGIN[1.8.1]
SELECT gl.gl_id, gl_name, g_status, REPLACE(succ_way, '/', gl_underqnt) underqnt,  gl_transport, gl_etime
FROM group_list gl;
-- #END

-- 販團總攬-帶where
-- #BEGIN[1.8.11]
SELECT gl.gl_id, gl_name, g_status, REPLACE(succ_way, '/', gl_underqnt) underqnt,  gl_transport, gl_etime
FROM group_list gl
WHERE g_status = :g_status;
-- #END

-- 編輯團販
-- #BEGIN[1.8.2]
SELECT gl_name,  SUBSTRING_INDEX(succ_way, '/', 1) scc_way, gl_underqnt, SUBSTRING_INDEX(succ_way, '/', -1) unit, gl_underqnt, gl_transport, gl_dtime, gl_stime, gl_etime, gl_note
FROM group_list gl
WHERE gl.gl_id = :gl_id;
-- #END

-- 編輯團販-商品列
-- #BEGIN[1.8.3]
SELECT g.img_path, m_name, gname, p_class, ver, matdate, p_imprice, p_offprice
FROM goods g, list_cont lc, manufacturer ma
WHERE g.gid = lc.gid AND g.m_id = ma.m_id
AND gl_id = :gl_id;
-- #END

-- 編輯團販-最新訂單
-- #BEGIN[1.8.4]
SELECT ol_id, ol_time, m_name, ol_orderyes, ol_trafyes, ol_name, SUM(prc) prc
FROM
(SELECT ol.ol_id, ol_time, m_name, ol_orderyes, ol_trafyes, ol_name, (price * op_qnt) prc
FROM open_list ol
LEFT JOIN members m
ON m.uid = ol.uid
LEFT JOIN personal_price pp
ON pp.ol_id = ol.ol_id
LEFT JOIN order_pro op
ON op.ol_id = pp.ol_id AND op.gl_id = pp.gl_id AND op.lc_autonum = pp.lc_autonum
WHERE pp.gl_id = :gl_id)t1
GROUP BY ol_id, ol_time, m_name, ol_orderyes, ol_trafyes, ol_name
ORDER BY ol_time DESC;
-- #END

-- 設狀態
-- 0下架 1上架 2垃圾桶
-- #BEGIN[2.8.1]
UPDATE group_list
SET g_status = :g_status
WHERE gl_id = :gl_id;
-- #END

-- #BEGIN[]

-- #END

-- #BEGIN[]

-- #END

-- #BEGIN[]

-- #END

-- #BEGIN[]

-- #END

-- #BEGIN[]

-- #END