angular.module('politicalGaps')
  .constant 'topics',
    gender:
      groups:
        male:
          label: "Male"
        female:
          label: "Female"
        other:
          label: "Other"
    age_range:
      groups:
        'bellow-30':
          label: 'Bellow 30'
          order: 0
        '30-40':
          label: '30 to 40'
          order: 1
        '40-50':
          label: '40 to 50'
          order: 2
        '50-60':
          label: '50 to 60'
          order: 3
        '60-70':
          label: '60 to 70'
          order: 4
        'over-70':
          label: 'Over 70'
          order: 5
    political_leaning:
      groups:
        'Left wing': {}
        'Center-left (social democrat)': {}
        'Green': {}
        'Center (liberal)': {}
        'Conservative': {}
        'Far-right': {}
        'Other': {}
    profession_category:
      groups:
        'Armed forces': {}
        'Private sector professional': {}
        'Civil servant': {}
        'Farmer': {}
        'Journalist, public relations': {}
        'Lawyer': {}
        'Manual worker, craftsman/woman': {}
        'Medical doctor, dentist, optician': {}
        'Miner': {}
        'Teacher': {}
        'University professor': {}
        'Student': {}
        'No occupation': {}
        'Other': {}
