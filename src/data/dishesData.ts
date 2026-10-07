import { LocalDish } from '../types/travel';

export const provinceDishesData: Record<string, LocalDish[]> = {
  'luang-prabang': [
    {
      id: 'or-lam',
      name: { lo: 'ເອາະຫຼາມຫຼວງພະບາງ', th: 'เอาะหลามหลวงพระบาง', en: 'Luang Prabang Or Lam Stew' },
      description: {
        lo: 'ແກງພື້ນເມືອງຫຼວງພະບາງທີ່ປຸງແຕ່ງດ້ວຍຊີ້ນງົວ/ຄວາຍ, ໝາກເຂືອ, ໄມ້ສະຄານ (ໃຫ້ລົດຊາດຊ່າລີ້ນຫອມສະໝຸນໄພ), ຜັກຊີ ແລະ ໃບອີ່ຕູ່.',
        th: 'แกงโบราณอันเป็นเอกลักษณ์ของหลวงพระบาง ใส่เนื้อ มะเขือเปราะ และไม้สะค้านรสซ่าปลายลิ้น หอมสมุนไพรสดชื่น',
        en: 'Traditional Lao royal stew slowly simmered with beef, pea eggplants, and "sakhan" vine providing a gentle numbing herbal warmth.',
      },
      tasteProfile: { lo: 'ກົມກ່ອມ, ຫອມສະໝຸນໄພ, ຊ່າລີ້ນສະຄານ', th: 'กลมกล่อม หอมสมุนไพร ซ่าลิ้นเบาๆ', en: 'Savory, herbal, tongue-tingling warmth' },
      category: 'main',
      image: '/images/lao_cuisine_or_lam_kaipen_1791279226086.jpg',
      mustTry: true,
    },
    {
      id: 'kaipen-jaew-bong',
      name: { lo: 'ໄຄແຜ່ນທອດງາໃສ່ແຈ່ວບອງ', th: 'ไคแผ่นทอดโรยงาจิ้มแจ่วบอง', en: 'Crispy Kaipen Riverweed with Jaew Bong' },
      description: {
        lo: 'ໄຄແມ່ນ້ຳຂອງຕາກແຫ້ງໂຮຍດ້ວຍງາ ແລະ ໝາກເລັ່ນ ທອດຈົນກອບ ກິນຄູ່ກັບແຈ່ວບອງຫວານເຜັດໃສ່ໜັງຄວາຍ.',
        th: 'สาหร่ายแม่น้ำโขงแผ่นโรยงาขาวและมะเขือเทศ ทอดกรอบจิ้มกับแจ่วบองรสหวานเผ็ดนัวใส่หนังควาย',
        en: 'Crispy pan-fried river algae seasoned with sesame seeds and garlic, served with sweet-savory water buffalo chili paste.',
      },
      tasteProfile: { lo: 'ກອບມັນ, ເຜັດຫວານນົວແຈ່ວບອງ', th: 'กรุบกรอบ หอมมัน เผ็ดหวานเข้มข้น', en: 'Crispy, nutty, sweet-spicy umami dip' },
      category: 'snack',
      image: '/images/lao_cuisine_or_lam_kaipen_1791279226086.jpg',
      mustTry: true,
    },
    {
      id: 'sai-oua-lpq',
      name: { lo: 'ໄສ້ອົ່ວຫຼວງພະບາງ', th: 'ไส้อั่วหลวงพระบาง', en: 'Luang Prabang Herbal Sausage' },
      description: {
        lo: 'ໄສ້ອົ່ວໝູສູດພື້ນເມືອງ ຫອມກິ່ນຕະໄຄ້, ໃບຂີ້ຫູດ, ຂ່າ ແລະ ຫອມບົ່ວ ຢ້າງເຕົາຖ່ານຈົນຜິວຕຶງກອບ.',
        th: 'ไส้อั่วหมูสูตรเฉพาะ หอมตะไคร้ ใบมะกรูด และสมุนไพรสด ย่างเตาถ่านหอมกรุ่น',
        en: 'Juicy artisanal pork sausage seasoned with lemongrass, kaffir lime leaves, and galangal, grilled over coals.',
      },
      tasteProfile: { lo: 'ຫອມຄວັນໄຟ, ເຂັ້ມຂຸ້ນສະໝຸນໄພ', th: 'หอมเครื่องเทศ ย่างเตาถ่านเนื้อฉ่ำ', en: 'Smoky, juicy, rich fresh herbs' },
      category: 'main',
      mustTry: false,
    },
  ],

  'vientiane-capital': [
    {
      id: 'khao-jee-pate-vte',
      name: { lo: 'ເຂົ້າຈີ່ປາເຕ້ວຽງຈັນ', th: 'ข้าวจี่บาแก็ตต์ปาเต้เวียงจันทน์', en: 'Vientiane Khao Jee Pâté Baguette' },
      description: {
        lo: 'ເຂົ້າຈີ່ຝຣັ່ງອົບກອບ ທາປາເຕ້ຕັບໝູເຂັ້ມຂຸ້ນ, ໝູຍໍ, ຜັກດອງສາມລົດ, ໝາກແຕງ, ຜັກຫອມ ແລະ ຊອດເຜັດ.',
        th: 'ขนมปังฝรั่งเศสอบกรอบนอกนุ่มใน ทาตับบดปาเต้เข้มข้น หมูยอ ผักดองอาจาด และซอสพริกสูตรเด็ด',
        en: 'Crispy French-Lao baguette slathered with rich liver pâté, steamed pork roll, pickled daikon carrots, and spicy chili sauce.',
      },
      tasteProfile: { lo: 'ກອບນອກນຸ່ມໃນ, ມັນນົວປາເຕ້, ສົ້ມຫວານຜັກດອງ', th: 'กรอบนอกนุ่มใน เค็มนัวเปรี้ยวหวานลงตัว', en: 'Crispy outside, rich savory pâté, zesty pickles' },
      category: 'main',
      image: '/images/lao_cuisine_khao_jee_pate_1791280202583.jpg',
      mustTry: true,
    },
    {
      id: 'pho-vientiane',
      name: { lo: 'ເຝີນ້ຳໃສວຽງຈັນ', th: 'เฝอน้ำใสเวียงจันทน์', en: 'Vientiane Clear Broth Pho' },
      description: {
        lo: 'ເສັ້ນເຝີນຸ່ມໃນນ້ຳຊຸບກະດູກງົວຕົ້ມກັ່ນຕອງໃສ ພ້ອມຊີ້ນງົວລວກ, ລູກຊີ້ນ ແລະ ຜັກກັບສົດໆ ປຸງດ້ວຍກະປິ ແລະ ໝາກເຜັດເຜົາ.',
        th: 'ก๋วยเตี๋ยวเฝอน้ำซุปกระดูกวัวเคี่ยวนานจนใสหวาน เสิร์ฟพร้อมผักสดจานโต กะปิ และพริกขี้หนูเผา',
        en: 'Silky rice noodles in long-simmered clear beef bone broth served with fresh mint, basil, roasted chilies, and lime.',
      },
      tasteProfile: { lo: 'ຫວານນ້ຳຕົ້ມກະດູກ, ຫອມຜັກສົດ', th: 'น้ำซุปหวานละมุน กลมกล่อมหอมเนื้อ', en: 'Delicate natural sweetness, fragrant fresh herbs' },
      category: 'soup',
      mustTry: true,
    },
    {
      id: 'sin-dad-vte',
      name: { lo: 'ຊີ້ນດາດວຽງຈັນ (ໝູກະທະແບບລາວ)', th: 'หมูกระทะชิ้นดาดเวียงจันทน์', en: 'Sin Dad (Lao Table BBQ Hotpot)' },
      description: {
        lo: 'ຊີ້ນໝູ ແລະ ງົວໝັກສະໝຸນໄພ ປີ້ງເທິງເຕົາທອງເຫຼືອງພ້ອມນ້ຳຊຸບຜັກອ້ອມຂ້າງ ຈິ້ມນ້ຳຈິ້ມຖົ່ວດິນບົດສູດວຽງຈັນ.',
        th: 'หมูและเนื้อหมักนุ่ม ย่างบนเตาดาดริมโขง จิ้มน้ำจิ้มถั่วลิสงคั่วบดหวานมันรสเด็ด',
        en: 'Lao-style tabletop charcoal barbecue grill and broth moat with seasoned meats dipped in rich peanut sauce.',
      },
      tasteProfile: { lo: 'ຫອມໝາກຖົ່ວດິນ, ນົວຊອດປີ້ງ', th: 'หอมถั่วคั่ว หวานมันเค็มนัว', en: 'Smoky grilled meats, creamy roasted peanut dip' },
      category: 'main',
      mustTry: false,
    },
  ],

  'vientiane-province': [
    {
      id: 'roti-vang-vieng',
      name: { lo: 'ໂຣຕີວັງວຽງ (ແພນເຄັກກ້ວຍ)', th: 'โรตีวังเวียง (แพนเค้กกล้วยหอม)', en: 'Vang Vieng Banana Nutella Roti' },
      description: {
        lo: 'ແປ້ງໂຣຕີຕີບາງທອດເນີຍຈົນກອບສີທອງ ໃສ່ກ້ວຍຫອມສົດ ລາດນົມຂົ້ນຫວານ ແລະ ນູເທວລາຊັອກໂກແລັດ.',
        th: 'แป้งโรตีแผ่นบางทอดเนยหอมกรอบ ไส้กล้วยหอมสด ราดนมข้นหวานและช็อกโกแลตนูเทลล่าเยิ้มๆ',
        en: 'Crispy golden street-side roti pancake folded over sweet bananas, drizzled with thick chocolate Nutella and condensed milk.',
      },
      tasteProfile: { lo: 'ກອບຫວານມັນ, ຫອມເນີຍ ແລະ ຊັອກໂກແລັດ', th: 'กรอบนอกนุ่มใน หวานมันหอมเนย', en: 'Crispy, sweet, rich chocolate banana indulgence' },
      category: 'dessert',
      mustTry: true,
    },
    {
      id: 'pa-nam-ngum-ping',
      name: { lo: 'ປານ້ຳງື່ມປີ້ງເກືອ', th: 'ปลาเผาเกลือเขื่อนน้ำงึม', en: 'Nam Ngum Salt-Crusted Grilled Lake Fish' },
      description: {
        lo: 'ປານິນສົດຈາກອ່າງນ້ຳງື່ມ ຍັດໄສ້ຕະໄຄ້ໃບໝາກຂາມ ພອກເກືອເມັດໜາ ຢ້າງຖ່ານໄຟອ່ອນ ຈິ້ມແຈ່ວຊີຟູດໝາກນາວ.',
        th: 'ปลาน้ำจืดสดจากเขื่อนน้ำงึม ยัดไส้สมุนไพรพอกเกลือย่างเตาถ่านเนื้อหวานฉ่ำ จิ้มน้ำจิ้มซีฟู้ดมะนาวสด',
        en: 'Fresh lake fish from Nam Ngum reservoir packed with lemongrass and encrusted in sea salt, slow-roasted over embers.',
      },
      tasteProfile: { lo: 'ຊີ້ນປາຫວານແໜ້ນ, ຫອມຕະໄຄ້', th: 'เนื้อปลาหวานนุ่มฉ่ำ ไร้กลิ่นคาว', en: 'Juicy, naturally sweet fish meat, herbal aroma' },
      category: 'main',
      mustTry: true,
    },
  ],

  'savannakhet': [
    {
      id: 'ping-kai-seno',
      name: { lo: 'ໄກ່ປີ້ງເຊໂນ ສະຫວັນນະເຂດ', th: 'ไก่ย่างเซโน สะหวันนะเขต', en: 'Ping Kai Seno (Famous Grilled Chicken)' },
      description: {
        lo: 'ໄກ່ລາດໝັກພິກໄທ, ກະທຽມ, ຕະໄຄ້ ແລະ ນ້ຳປາແທ້ ໜີບໄມ້ໄຜ່ປີ້ງເຕົາຖ່ານຈົນໜັງກອບ ຊີ້ນນຸ່ມຫອມຄວັນໄຟ ກິນກັບເຂົ້າໜຽວ ແລະ ຕຳໝາກຫຸ່ງ.',
        th: 'ไก่บ้านหมักเครื่องเทศสมุนไพรเสียบไม้ไผ่ย่างถ่าน หนังกรอบเนื้อนุ่มฉ่ำ กลิ่นหอมฟุ้ง ทานคู่ข้าวเหนียวและส้มตำลาว',
        en: 'The most iconic grilled chicken in Laos from Seno junction: free-range chicken clamped on split bamboo, roasted over wood embers to smoky perfection.',
      },
      tasteProfile: { lo: 'ໜັງກອບຊີ້ນນຸ່ມ, ຫອມພິກໄທ ແລະ ກະທຽມ', th: 'หนังบางกรอบ เนื้อนุ่มฉ่ำ หอมกระเทียมพริกไทย', en: 'Crispy skin, succulent meat, garlic-pepper smoke' },
      category: 'main',
      image: '/images/lao_cuisine_seno_chicken_1791279240658.jpg',
      mustTry: true,
    },
    {
      id: 'sin-savanh',
      name: { lo: 'ຊີ້ນສະຫວັນ (ຊີ້ນແຫ້ງໂຮຍເມັດຜັກຊີ)', th: 'เนื้อสวรรค์สะหวันนะเขต', en: 'Sin Savanh (Coriander Sun-Dried Beef)' },
      description: {
        lo: 'ຊີ້ນງົວຕັດເປັນແຜ່ນບາງ ໝັກນ້ຳຕານອ້ອຍ, ຊອດປຸງລົດ ແລະ ເມັດຜັກຊີບົດ ຕາກແດດດຽວແລ້ວທອດຈົນຫອມ.',
        th: 'เนื้อวัวแผ่นหมักน้ำตาลอ้อย ซีอิ๊ว และเม็ดผักชีหอมๆ ตากแดดเดียวทอดกรอบนุ่ม เคี้ยวเพลิน',
        en: 'Thin beef slices cured in cane sugar, soy, and crushed coriander seeds, sun-dried then flash-fried.',
      },
      tasteProfile: { lo: 'ຫວານເຄັມກົມກ່ອມ, ຫອມເມັດຜັກຊີ', th: 'หวานเค็มกลมกล่อม หอมกลิ่นลูกผักชี', en: 'Sweet-savory, fragrant roasted coriander seeds' },
      category: 'snack',
      mustTry: true,
    },
  ],

  'champasak': [
    {
      id: 'paksong-coffee',
      name: { lo: 'ກາເຟປາກຊ່ອງ ພູພຽງບໍລະເວນ', th: 'กาแฟปากซ่อง ที่ราบสูงโบลาเวน', en: 'Paksong Bolaven Single-Origin Coffee' },
      description: {
        lo: 'ກາເຟອາຣາບິກາ ແລະ ໂຣບັສຕາ ປູກເທິງດິນພູໄຟເກົ່າສູງກວ່າ 1,200 ແມັດ ຊົງດຣິບແບບດັ້ງເດີມ ຫອມເລິກຊຶ້ງ.',
        th: 'กาแฟอาราบิกาและโรบัสตาชั้นเลิศจากดินภูเขาไฟโบราณสูง 1,200 เมตร รสชาติเข้มข้น หอมกลิ่นช็อกโกแลตและผลไม้',
        en: 'World-class Arabica coffee cultivated on ancient volcanic basalt soils above 1,200m on the Bolaven Plateau, rich with chocolate and caramel notes.',
      },
      tasteProfile: { lo: 'ເຂັ້ມຂຸ້ນ, ຫອມຊັອກໂກແລັດ ແລະ ໝາກໄມ້ປ່າ', th: 'เข้มข้น หอมกรุ่น โทนช็อกโกแลตและคาราเมล', en: 'Deep body, dark chocolate, caramel notes' },
      category: 'drink',
      image: '/images/lao_cuisine_paksong_coffee_1791279250391.jpg',
      mustTry: true,
    },
    {
      id: 'tom-som-pa-mekong',
      name: { lo: 'ຕົ້ມສົ້ມປານ້ຳຂອງ', th: 'ต้มส้มปลาแม่น้ำโขง', en: 'Tom Som Pa (Tangy Mekong River Fish Soup)' },
      description: {
        lo: 'ປາແມ່ນ້ຳຂອງສົດໆ ຕົ້ມໃສ່ໝາກຂາມສົ້ມ, ໃບຂີ້ຫູດ, ຫົວສີໄຄ ແລະ ຜັກອີ່ຕູ່ ນ້ຳຊຸບສົ້ມໂລ່ງຄໍ.',
        th: 'ปลาแม่น้ำโขงเนื้อแน่น ต้มกับยอดมะขามเปรี้ยว ตะไคร้ ข่า ใบกะเพราป่า ซดร้อนๆ เปรี้ยวสดชื่น',
        en: 'Wild fresh Mekong fish simmered in a zesty broth with sour tamarind, lemongrass, galangal, and fresh Lao basil.',
      },
      tasteProfile: { lo: 'ສົ້ມກົມກ່ອມ, ເຜັດຮ້ອນ, ບໍ່ຄາວ', th: 'เปรี้ยวอมหวาน หอมสมุนไพร ซดคล่องคอ', en: 'Bright citrusy sour, herbal broth, flaky fish' },
      category: 'soup',
      mustTry: true,
    },
  ],

  'khammouane': [
    {
      id: 'mee-thakhek',
      name: { lo: 'ໝີ່ທ່າແຂກ', th: 'หมี่ท่าแขกโบราณ', en: 'Thakhek Handmade Egg Noodles' },
      description: {
        lo: 'ໝີ່ໄຂ່ເສັ້ນສົດ ຜັດຫຼືລວກຄຸກນ້ຳມັນກະທຽມເຈຽວ, ຊີ້ນໝູແດງ, ໝາກຖົ່ວດິນ ແລະ ນ້ຳຊຸບກະດູກໝູຫວານ.',
        th: 'บะหมี่ไข่เส้นเหนียวนุ่ม คลุกน้ำมันกระเทียมเจียว หมูแดงย่าง และถั่วลิสงป่น พร้อมน้ำซุปกระดูกหมูหวานกระดูก',
        en: 'Chewy handmade egg noodles tossed with fragrant shallot oil, roasted pork, crushed peanuts, and clear broth.',
      },
      tasteProfile: { lo: 'ເສັ້ນໜຽວນຸ່ມ, ຫອມກະທຽມເຈຽວ, ນົວ', th: 'เส้นเหนียวนุ่ม หอมกระเทียมเจียว เค็มนัว', en: 'Springy egg noodles, fragrant garlic oil, savory broth' },
      category: 'main',
      mustTry: true,
    },
    {
      id: 'som-moo-thakhek',
      name: { lo: 'ສົ້ມໝູທ່າແຂກ', th: 'แหนมส้มหมูท่าแขก', en: 'Thakhek Fermented Sour Pork' },
      description: {
        lo: 'ຊີ້ນໝູສົດປະສົມໜັງໝູຊອຍບາງ ໝັກເຂົ້າໜຽວ ແລະ ກະທຽມ ຫໍ່ໃບຕອງກ້ວຍພ້ອມໝາກເຜັດເມັດ.',
        th: 'แหนมหมูเนื้อแน่นผสมหนังหมูกรุบกรอบ หมักข้าวเหนียวและกระเทียม ห่อใบตองพร้อมพริกขี้หนูสด',
        en: 'Cured sour pork sausage with shredded pork skin, garlic, and fresh fiery bird’s eye chilies wrapped in banana leaves.',
      },
      tasteProfile: { lo: 'ສົ້ມນົວ, ກອບໜັງໝູ, ເຜັດເມັດ', th: 'เปรี้ยวกำลังดี กรุบกรอบหนังหมู เผ็ดจี๊ด', en: 'Pleasantly tangy, chewy skin texture, spicy chili bite' },
      category: 'snack',
      mustTry: false,
    },
  ],

  'phongsaly': [
    {
      id: 'ancient-tea-400',
      name: { lo: 'ຊາຂຽວ 400 ປີ ຜົ້ງສາລີ', th: 'ชาเขียวต้นโบราณ 400 ปี พงสาลี', en: '400-Year Ancient Grove Green Tea' },
      description: {
        lo: 'ຍອດຊາປ່າຈາກຕົ້ນຊາບູຮານອາຍຸກວ່າ 400 ປີ ບ້ານກໍແມນ ເກັບດ້ວຍມື ຄົວກະທະແບບດັ້ງເດີມ ມີສານຕ້ານອະນຸມູນອິດສະຫຼະສູງ.',
        th: 'ยอดชาป่าจากต้นชาอายุกว่า 400 ปี บ้านกอแมน เก็บด้วยมือ คั่วเตาฟืนแบบโบราณ รสชาตินุ่มลึก ชุ่มคอ',
        en: 'Rare green and white tea hand-plucked from 400-year-old wild tea trees in the high mountains of Ban Komaen, delivering sweet floral aftertaste.',
      },
      tasteProfile: { lo: 'ຫອມດອກໄມ້ປ່າ, ຊຸ່ມຄໍ, ບໍ່ຝາດ', th: 'หอมกลิ่นดอกไม้ป่า ชุ่มคอยาวนาน ไม่ฝาด', en: 'Wild floral aroma, sweet lingering finish, zero bitterness' },
      category: 'drink',
      mustTry: true,
    },
    {
      id: 'lao-khiao-phongsaly',
      name: { lo: 'ເຫຼົ້າຂຽວຜົ້ງສາລີ (ສີຂຽວທຳມະຊາດ)', th: 'เหล้าเขียวพงสาลีสมุนไพร', en: 'Phongsaly Green Herbal Rice Spirit' },
      description: {
        lo: 'ເຫຼົ້າພື້ນເມືອງກັ່ນຈາກເຂົ້າໜຽວພູດອຍ ແລະ ແຊ່ໃບສະໝຸນໄພພື້ນບ້ານຈົນເປັນສີຂຽວມໍລະກົດທຳມະຊາດ.',
        th: 'สุราพื้นเมืองกลั่นจากข้าวเหนียวดอย แช่ใบสมุนไพรธรรมชาติจนได้สีเขียวมรกต หอมสมุนไพร',
        en: 'Distilled mountain rice spirit infused with wild forest leaves that impart an emerald green color and soothing herbal character.',
      },
      tasteProfile: { lo: 'ອົບອຸ່ນຮ່າງກາຍ, ຫອມສະໝຸນໄພ', th: 'อบอุ่นร่างกาย หอมกลิ่นใบสมุนไพร', en: 'Warming, botanical, smooth herbal finish' },
      category: 'drink',
      mustTry: false,
    },
  ],

  'xieng-khouang': [
    {
      id: 'khao-kai-noy',
      name: { lo: 'ເຂົ້າໄກ່ນ້ອຍຊຽງຂວາງ', th: 'ข้าวไก่น้อยเชียงขวาง (ข้าวเหนียวพันธุ์แท้)', en: 'Khao Kai Noy (Fragrant Highland Sticky Rice)' },
      description: {
        lo: 'ເຂົ້າໜຽວເມັດນ້ອຍປູກເທິງພູພຽງຊຽງຂວາງ ເມື່ອໜຶ້ງແລ້ວຈະອ່ອນນຸ່ມຫຼາຍ ຫອມກິ່ນໃບເຕີຍ ແລະ ໜຽວນຸ່ມຂ້າມວັນ.',
        th: 'ข้าวเหนียวเมล็ดเล็กพันธุ์พื้นเมืองของที่ราบสูงเชียงขวาง นึ่งแล้วหอมนุ่มเป็นพิเศษ แม้เย็นก็ยังนุ่ม',
        en: 'Rare, small-grain highland sticky rice renowned across Laos for its uniquely soft, non-drying texture and natural aroma.',
      },
      tasteProfile: { lo: 'ນຸ່ມໜຽວ, ຫອມຫວານທຳມະຊາດ', th: 'นุ่มเหนียวเคี้ยวเพลิน หอมกลิ่นรวงข้าว', en: 'Extremely tender, subtly sweet, fragrant grain' },
      category: 'main',
      mustTry: true,
    },
  ],

  'luang-namtha': [
    {
      id: 'khao-soi-tai-lue',
      name: { lo: 'ເຂົ້າຊອຍໄຕລື້ ຫຼວງນ້ຳທາ', th: 'ข้าวซอยไทลื้อ หลวงน้ำทา', en: 'Tai Lue Khao Soi (Minced Pork Noodle)' },
      description: {
        lo: 'ເຂົ້າຊອຍສູດດັ້ງເດີມຂອງຊາວໄຕລື້ ເສັ້ນໃຫຍ່ລວກໃນນ້ຳຊຸບໃສ ລາດດ້ວຍໝູສັບຜັດໝາກຖົ່ວເນົ່າ ແລະ ໝາກເລັ່ນ ໂຮຍຜັກກາດນ້ຳ.',
        th: 'ข้าวซอยสูตรโบราณของชาวไทลื้อ เส้นใหญ่แบนนุ่ม ราดหน้าด้วยหมูสับผัดถั่วเน่ามะเขือเทศ โรยผักน้ำสด',
        en: 'Traditional Tai Lue noodle soup featuring wide rice noodles crowned with a rich bolognese-like ragù of fermented soybean paste, tomatoes, and ground pork.',
      },
      tasteProfile: { lo: 'ເຂັ້ມຂຸ້ນຖົ່ວເນົ່າ, ສົ້ມຫວານໝາກເລັ່ນ, ນົວ', th: 'เข้มข้นถั่วเน่า หอมมะเขือเทศ กลมกล่อม', en: 'Savory fermented bean umami, sweet tomato tang' },
      category: 'main',
      image: '/images/lao_cuisine_khao_soi_noodles_1791280214155.jpg',
      mustTry: true,
    },
  ],

  'bokeo': [
    {
      id: 'pa-mekong-luak',
      name: { lo: 'ປານ້ຳຂອງລວກຈິ້ມ', th: 'ปลาแม่น้ำโขงลวกจิ้มสมุนไพร', en: 'Steamed Mekong River Fish with Galangal Dip' },
      description: {
        lo: 'ປາບຶກ ຫຼື ປາຄ້າວແມ່ນ້ຳຂອງສົດໆ ລວກພ້ອມຕະໄຄ້ໃບຂີ້ຫູດ ຈິ້ມແຈ່ວຂ່າໝາກນາວລົດເຜັດສົ້ມ.',
        th: 'ปลาแม่น้ำโขงสดลวกกับตะไคร้ใบมะกรูด เสิร์ฟคู่น้ำจิ้มแจ่วข่ามะนาวรสแซ่บจัดจ้าน',
        en: 'Tender fresh wild Mekong fish poached with kaffir lime and served with a zesty galangal and lime chili sauce.',
      },
      tasteProfile: { lo: 'ຊີ້ນປາແໜ້ນຫວານ, ເຜັດສົ້ມແຈ່ວຂ່າ', th: 'เนื้อปลาเด้งหวาน น้ำจิ้มเปรี้ยวเผ็ดหอมข่า', en: 'Sweet flaky fish, pungent spicy lime-galangal dip' },
      category: 'main',
      mustTry: true,
    },
  ],

  'oudomxay': [
    {
      id: 'kaeng-kai-bai-kham',
      name: { lo: 'ແກງໄກ່ລາດໃສ່ໃບໝາກຂາມອ່ອນ', th: 'แกงไก่บ้านใบมะขามอ่อน', en: 'Free-Range Chicken Soup with Young Tamarind Leaves' },
      description: {
        lo: 'ໄກ່ລາດພູດອຍຊີ້ນແໜ້ນ ຕົ້ມໃສ່ຍອດໃບໝາກຂາມອ່ອນ, ຂ່າ, ຕະໄຄ້ ນ້ຳແກງສົ້ມອ່ອນໆ ຊົດຮ້ອນໆ.',
        th: 'ไก่บ้านเลี้ยงธรรมชาติเนื้อแน่น ต้มกับยอดใบมะขามอ่อนสด น้ำซุปเปรี้ยวกลมกล่อมคล่องคอ',
        en: 'Tender highland free-range chicken simmered with tart young tamarind shoots, lemongrass, and galangal.',
      },
      tasteProfile: { lo: 'ສົ້ມສົດຊື່ນ, ຫອມໄກ່ບ້ານ', th: 'เปรี้ยวสดชื่นจากยอดมะขาม ไก่เนื้อหวาน', en: 'Refreshing citrus sourness, savory free-range poultry' },
      category: 'soup',
      mustTry: true,
    },
  ],

  'salavan': [
    {
      id: 'kai-nab-salavan',
      name: { lo: 'ໄກ່ນາບສາລະວັນ (ສູດດັ້ງເດີມ)', th: 'ไก่นาบสาละวัน (ไก่ย่างโบราณ)', en: 'Kai Nab Salavan (Pressed Roasted Chicken)' },
      description: {
        lo: 'ໄກ່ບ້ານໝັກສະໝຸນໄພພື້ນບ້ານ ໜີບໄມ້ໄຜ່ແປຮາບ ນາບເທິງເຕົາຖ່ານໄຟຮຸ່ນໆ ຈົນຫອມສຸກທົ່ວເຖິງ.',
        th: 'ไก่บ้านหมักสมุนไพร หนีบไม้นาบเตาถ่านให้แบนและสุกทั่วถึง เนื้อนุ่มหนังตึง กลิ่นหอมเป็นเอกลักษณ์',
        en: 'Heritage pressed-roasted chicken flattened between bamboo racks and grilled slowly over low embers, infused with wild herbs.',
      },
      tasteProfile: { lo: 'ຫອມຄວັນໄຟ, ເຂັ້ມຂຸ້ນຮອດກະດູກ', th: 'หอมกรุ่นกลิ่นฟืน เนื้อนุ่มรสเข้มข้น', en: 'Intensely smoky, tender and aromatic down to the bone' },
      category: 'main',
      mustTry: true,
    },
  ],

  'sekong': [
    {
      id: 'dakcheung-khao-lam',
      name: { lo: 'ເຂົ້າລາມບ້ານດາກຈຶງ', th: 'ข้าวหลามดอยดักจึง', en: 'Dakcheung Mountain Bamboo Sticky Rice' },
      description: {
        lo: 'ເຂົ້າໜຽວດອຍໃສ່ນ້ຳກະທິ ແລະ ຖົ່ວດຳ ຍັດໃນກະບອກໄມ້ໄຜ່ປ່າ ຢ້າງໄຟຊ້າໆ ຈົນມີເຍື່ອໄຜ່ຫຸ້ມ.',
        th: 'ข้าวเหนียวดอยหอมมันผสมกะทิและถั่ว เผาในกระบอกไม้ไผ่ป่า รสหวานมันหอมเยื่อไผ่',
        en: 'Highland sticky rice roasted inside fresh wild bamboo stalks with coconut milk and beans, peeled with paper-thin bamboo membrane.',
      },
      tasteProfile: { lo: 'ຫວານມັນ, ຫອມເຍື່ອໄມ້ໄຜ່', th: 'หวานมันกลมกล่อม หอมเยื่อไผ่ธรรมชาติ', en: 'Nutty, subtly sweet, infused with bamboo scent' },
      category: 'snack',
      mustTry: true,
    },
  ],

  'attapeu': [
    {
      id: 'sin-khuai-haeng-attapeu',
      name: { lo: 'ຊີ້ນຄວາຍແຫ້ງອັດຕະປື', th: 'เนื้อควายแดดเดียวอัตตะปือ', en: 'Attapeu Spiced Sun-Dried Buffalo' },
      description: {
        lo: 'ຊີ້ນຄວາຍດອນໝັກເກືອສິນເທີບ, ພິກໄທດຳ ແລະ ຫົວຂ່າ ຕາກແດດຈົນແຫ້ງກອບ ປີ້ງໄຟອ່ອນໆ ທຸບໃຫ້ນຸ່ມ.',
        th: 'เนื้อควายคัดพิเศษหมักเกลือ พริกไทยดำ และข่า ตากแดดย่างไฟอ่อน ทุบให้นุ่มเคี้ยวง่าย',
        en: 'Lean prime water buffalo cured with black pepper and galangal, sun-dried then roasted over embers and pounded tender.',
      },
      tasteProfile: { lo: 'ແໜ້ນນຸ່ມ, ຫອມພິກໄທດຳ, ເຂັ້ມຂຸ້ນ', th: 'เนื้อแน่นเคี้ยวเพลิน หอมพริกไทยดำเข้มข้น', en: 'Chewy and tender, robust black pepper seasoning' },
      category: 'snack',
      mustTry: true,
    },
  ],

  'houaphanh': [
    {
      id: 'jaew-vah-samneua',
      name: { lo: 'ແຈ່ວຫວ້າຊຳເໜືອ', th: 'แจ่วหว้าซำเหนือ', en: 'Sam Neua Jaew Vah Forest Dip' },
      description: {
        lo: 'ແຈ່ວພື້ນເມືອງຊຳເໜືອ ຕຳຈາກໝາກຫວ້າປ່າ, ໝາກເຜັດປີ້ງ, ກະທຽມ ແລະ ນ້ຳປາແດກຕົ້ມສຸກ ລົດຊາດສົ້ມເຜັດນົວ.',
        th: 'น้ำพริกโบราณตำจากผลหว้าป่า พริกเผา กระเทียม และปลาร้าต้มสุก เปรี้ยวเผ็ดแซ่บสะใจ',
        en: 'Rare tribal relish pounded with wild forest berries, roasted chili peppers, and savory boiled fish sauce.',
      },
      tasteProfile: { lo: 'ສົ້ມຝາດນົວ, ເຜັດແຊບ', th: 'เปรี้ยวอมฝาด เผ็ดนัวลงตัว', en: 'Tart forest berries, fiery chilies, deep umami' },
      category: 'snack',
      mustTry: true,
    },
  ],

  'xayabury': [
    {
      id: 'jaew-mak-khua-xby',
      name: { lo: 'ແຈ່ວໝາກເຂືອໄຊຍະບູລີ', th: 'แจ่วมะเขือเผาไชยบุรี', en: 'Roasted Eggplant Jaew Dip' },
      description: {
        lo: 'ໝາກເຂືອມ່ວງ/ຂຽວ ປີ້ງເຕົາຖ່ານຈົນສຸກຫອມ ລອກເປືອກອອກ ຕຳໃສ່ໝາກເຜັດປີ້ງ, ຫອມແດງ ແລະ ປາແດກ.',
        th: 'มะเขือเปราะเผาเตาถ่านจนหอม ลอกเปลือกตำกับพริกเผา หอมแดง และปลาร้าต้มสุก ทานกับผักลวก',
        en: 'Charcoal-roasted eggplants pounded with charred shallots, garlic, and savory fish essence, served with sticky rice.',
      },
      tasteProfile: { lo: 'ຫອມກິ່ນຄວັນໄຟ, ນົວປາແດກ', th: 'หอมกลิ่นเผา นัวปลาร้า เข้ากับผักลวก', en: 'Silky, smoky, rich fermented fish aroma' },
      category: 'snack',
      mustTry: true,
    },
  ],

  'bolikhamxay': [
    {
      id: 'pa-nam-xan-soup',
      name: { lo: 'ປານ້ຳຊັນຕົ້ມສົ້ມ', th: 'ต้มส้มปลาน้ำซัน', en: 'Nam Xan River Fish Sour Broth' },
      description: {
        lo: 'ປາແມ່ນ້ຳຊັນສົດໆ ຕົ້ມໃສ່ຍອດສົ້ມປ່າ, ຂ່າ, ຕະໄຄ້ ແລະ ໃບຂີ້ຫູດ ນ້ຳຊຸບໃສຫອມສະອາດ.',
        th: 'ปลาแม่น้ำซันสดต้มกับยอดส้มป่า ข่า ตะไคร้ น้ำซุปใสรสเปรี้ยวนุ่มนวล',
        en: 'Sweet freshwater river fish from Nam Xan river simmered with forest sour leaves and aromatic galangal.',
      },
      tasteProfile: { lo: 'ສົ້ມອ່ອນໆ, ຫອມສະໝຸນໄພ', th: 'เปรี้ยวละมุน ซดคล่องคอ', en: 'Gentle sour broth, delicate fresh fish' },
      category: 'soup',
      mustTry: true,
    },
  ],

  'xaysomboun': [
    {
      id: 'pad-phed-moo-pa',
      name: { lo: 'ຊີ້ນໝູປ່າຜັດເຜັດພູເບ້ຍ', th: 'ผัดเผ็ดหมูป่าดอยพูเบี้ย', en: 'Phou Bia Wild Mountain Boar Stir-Fry' },
      description: {
        lo: 'ຊີ້ນໝູປ່າໜັງກຶກ ຜັດໃສ່ພິກໄທສົດ, ໃບກະເພົາປ່າ ແລະ ເຄື່ອງແກງຕຳເອງ ລົດຊາດເຜັດຮ້ອນອົບອຸ່ນຮ່າງກາຍ.',
        th: 'เนื้อหมูป่าหนังกรุบ ผัดพริกแกงสด พริกไทยอ่อน และกะเพราป่า เผ็ดร้อนคลายหนาว',
        en: 'Hearty wild boar cuts stir-fried with green peppercorns, wild sacred basil, and mountain chili paste.',
      },
      tasteProfile: { lo: 'ເຜັດຮ້ອນ, ໜັງກຶກກອບ, ຫອມໃບກະເພົາ', th: 'เผ็ดร้อนสะใจ หนังกรุบสู้ฟัน', en: 'Fiery, aromatic wild basil, crunchy skin' },
      category: 'main',
      mustTry: true,
    },
  ],
};

export const getDishesForProvince = (provinceId: string): LocalDish[] => {
  return provinceDishesData[provinceId] || [];
};
