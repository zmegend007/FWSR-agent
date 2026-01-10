
import React, { useState } from 'react';
import { BLOG_POSTS as INITIAL_POSTS } from '../data/blogPosts';
import { BlogPost } from '../types';

const NewsPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  
  // CMS State
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Regulatory',
    author: 'FWSR Auditor'
  });

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    const post: BlogPost = {
      ...newPost,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: `${Math.ceil(newPost.content.split(' ').length / 200)} min`
    };
    setPosts([post, ...posts]);
    setIsCmsOpen(false);
    setNewPost({ title: '', excerpt: '', content: '', category: 'Regulatory', author: 'FWSR Auditor' });
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-black/5 pb-16 mb-20">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1 border border-red text-red text-[10px] font-black uppercase tracking-widest mb-6">News & Mandate Updates</div>
            <h1 className="text-7xl md:text-9xl font-heading font-black uppercase tracking-tighter leading-none mb-8 italic text-red">Archive.</h1>
            <p className="text-xl text-slate-500 font-light leading-relaxed">
              Official briefings and technical insights regarding the July 2026 sustainability requirements.
            </p>
          </div>
          {!selectedPost && (
            <button 
              onClick={() => setIsCmsOpen(!isCmsOpen)}
              className="bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red transition-all"
            >
              {isCmsOpen ? 'Close CMS' : 'Access CMS'}
            </button>
          )}
        </div>

        {isCmsOpen && (
          <div className="animate-reveal mb-20 p-12 bg-slate-50 border border-black/5 max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-black uppercase mb-8">Publish News Update</h2>
            <form onSubmit={handleAddPost} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Headline" 
                  value={newPost.title}
                  onChange={e => setNewPost({...newPost, title: e.target.value})}
                  className="w-full bg-white border border-black/10 p-4 focus:border-red outline-none"
                  required
                />
                <select 
                  value={newPost.category}
                  onChange={e => setNewPost({...newPost, category: e.target.value})}
                  className="w-full bg-white border border-black/10 p-4 focus:border-red outline-none"
                >
                  <option>Regulatory</option>
                  <option>Sourcing</option>
                  <option>Social Ethics</option>
                  <option>Technical Brief</option>
                </select>
              </div>
              <textarea 
                placeholder="Excerpt (Brief summary)" 
                value={newPost.excerpt}
                onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                className="w-full bg-white border border-black/10 p-4 focus:border-red outline-none h-24"
                required
              />
              <textarea 
                placeholder="Full Article Content" 
                value={newPost.content}
                onChange={e => setNewPost({...newPost, content: e.target.value})}
                className="w-full bg-white border border-black/10 p-4 focus:border-red outline-none h-64"
                required
              />
              <button type="submit" className="bg-red text-white px-12 py-6 text-technical hover:bg-black transition-all">
                Publish to Newsroom
              </button>
            </form>
          </div>
        )}

        {!selectedPost ? (
          <div className="animate-reveal grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="group cursor-pointer border-t border-black/5 pt-12 flex flex-col h-full"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex justify-between items-start mb-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-red">{post.category}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">{post.readTime}</p>
                </div>
                <h3 className="text-3xl font-heading font-bold uppercase tracking-tight mb-6 group-hover:text-red transition-all flex-1">{post.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-8">{post.excerpt}</p>
                <div className="mt-auto">
                  <span className="text-[10px] font-black uppercase tracking-widest border-b border-black/10 group-hover:border-red transition-all pb-1">Read Article →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="animate-reveal max-w-4xl mx-auto">
            <button 
              onClick={() => setSelectedPost(null)}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red transition-all mb-16 flex items-center gap-4"
            >
              ← Back to Archive
            </button>
            <p className="text-[10px] font-black uppercase tracking-widest text-red mb-4">{selectedPost.category}</p>
            <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter leading-tight mb-12">{selectedPost.title}</h1>
            <div className="flex items-center gap-8 border-b border-black/5 pb-10 mb-16 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <p>By {selectedPost.author}</p>
              <p>{selectedPost.date}</p>
            </div>
            <div className="prose prose-xl max-w-none text-slate-600 font-light leading-[1.8]">
              <p className="text-2xl text-black font-medium mb-12 border-l-4 border-red pl-8 italic">{selectedPost.excerpt}</p>
              <div className="whitespace-pre-wrap">{selectedPost.content}</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NewsPage;
