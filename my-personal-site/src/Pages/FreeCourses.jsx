import React, { useState } from 'react';

export default function FreeCourses() {
  // Your course data - REPLACE LINKS with real URLs
  const courses = [
    { 
      id: 1, 
      title: 'Frontend Web Development Bootcamp Course (JavaScript, HTML, CSS)', 
      category: 'Frontend', 
      description: 'Basic C++ concepts + hands-on projects',
      link: 'https://www.classcentral.com/classroom/freecodecamp-frontend-web-development-bootcamp-course-javascript-html-css-104805',
      image: 'https://d3mxt5v3yxgcsr.cloudfront.net/courses/6020/course_6020_image.png'
    },
    { 
      id: 2, 
      title: 'Microsoft Office Tutorial - Learn Excel, PowerPoint and Word', 
      category: 'Backend', 
      description: 'Build REST APIs + Database',
      link: 'https://www.classcentral.com/classroom/youtube-microsoft-office-tutorial-learn-excel-powerpoint-and-word-9-hour-ms-office-course-117828',
      image: 'https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/7ff838f379ec.jpg'
    },
    { 
      id: 3, 
      title: 'SQL Full Course for Beginners (30 Hours) – From Zero to Hero', 
      category: 'Database', 
      description: 'SQL + NoSQL for Production',
      link: 'https://youtu.be/SSKVgrwhzus?si=Yplcg_Sy24QyJrHu',
      image: 'https://cdn.vectorstock.com/i/preview-1x/72/14/sql-vector-46567214.jpg'
    },
    { 
      id: 4, 
      title: 'Full Stack Web Development Course - ReactJS, NodeJS, Express, MySQL', 
      category: 'Full Stack', 
      description: 'FAANG-level preparation',
      link: 'https://www.classcentral.com/classroom/youtube-full-stack-web-development-course-reactjs-nodejs-express-mysql-514736',
      image: 'https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/51b263ede751.jpg'
    },
    { 
      id: 5, 
      title: 'Cloud Computing', 
      category: 'Cloud', 
      description: 'Cloud fundamentals',
      link: 'https://www.classcentral.com/classroom/youtube-cloud-computing-47759',
      image: 'https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/bfe947b5a5df.jpg',
    },
  ];

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = filter === 'All' || course.category === filter;
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', padding: '2rem', gap: '2rem' }}>
      {/* LEFT FILTER SIDEBAR */}
      <div style={{ 
        width: '280px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem 1.5rem', 
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
      }}>
        <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>🔍 Filter</h3>
        
        {/* Category Filter */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '1rem' }}>Category:</label>
          {['All', 'Frontend', 'Backend', 'Database', 'Interview'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                display: 'block',
                width: '100%',
                padding: '1rem',
                marginBottom: '0.75rem',
                border: 'none',
                borderRadius: '12px',
                background: filter === cat ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>Search:</label>
          <input
            type="text"
            placeholder="Course name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)'
            }}
          />
        </div>
      </div>

      {/* COURSE CARDS GRID */}
      <div style={{ flex: 1 }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', color: '#333' }}>🚀 Free Courses</h1>
        
        {filteredCourses.length === 0 ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '400px',
            fontSize: '1.5rem',
            color: '#888'
          }}>
            No courses match your filter 😢
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem' 
          }}>
            {filteredCourses.map(course => (
              <div
                key={course.id}
                onClick={() => handleCardClick(course.link)}
                style={{
                  cursor: 'pointer',
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  border: '3px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                  e.currentTarget.style.borderColor = '#007bff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                {/* Course Image */}
                <div style={{
                  height: '200px',
                  backgroundImage: `url(${course.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(0,123,255,0.9)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    {course.category}
                  </div>
                </div>

                {/* Course Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ 
                    margin: '0 0 0.5rem 0', 
                    fontSize: '1.4rem', 
                    color: '#333',
                    lineHeight: '1.3'
                  }}>
                    {course.title}
                  </h3>
                  <p style={{ 
                    color: '#666', 
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    {course.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      background: 'linear-gradient(45deg, #007bff, #0056b3)',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '25px',
                      fontWeight: 'bold',
                      fontSize: '0.95rem'
                    }}>
                      🎓 START FREE
                    </div>
                    <span style={{ color: '#999', fontSize: '0.9rem' }}>
                      → Click card to start
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
