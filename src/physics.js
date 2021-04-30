import { vec2 } from 'gl-matrix';

const config = { }


class sourceConfiguration {
    constructor(points, masses) {
        this.points = points;
        this.masses = masses;
        this.n = points.length;
        console.assert(points.length == masses.length, "Sources lengths not equal");
        this.gconst = 1;
    }
    gconst_set(g) {
        this.gconst = g;
    }
    calc_accvec(pvec) {
        // Return acceleration vector at point pvec
        const rmin = 0.05;
        var accvec = vec2.create();
        var bufa = vec2.create();
        var bufb = vec2.create();
        for(var i = 0; i < this.n; i++) {
            const r = vec2.sub(bufa, this.points[i], pvec);
            const rnorm = vec2.length(r);
            if(rnorm >= rmin) {
                accvec = vec2.scaleAndAdd(accvec, accvec, r, this.gconst * this.masses[i] / (rnorm**3));
            }
        }
        return accvec;
    }
    calc_accvec_harmonic(pvec) {
        // Not used. This is for messing with alternative force laws
        var accvec = vec2.create();
        var bufa = vec2.create();
        var bufb = vec2.create();
        for(var i = 0; i < this.n; i++) {
            const r = vec2.sub(bufa, this.points[i], pvec);
            const rnorm = vec2.length(r);
            accvec = vec2.scaleAndAdd(accvec, accvec, r, this.gconst * this.masses[i] / rnorm**1);
        }
        return accvec;
    }
}

class movingBody {
    constructor(pos, vel) {
        this.pos = pos;
        this.vel = vel;
    }

    long_update(sourceconfig, keyState, timestep, steps) {
        // Step forward in time by an arbitrary timespan

        for(var i = 0; i < steps; i++) {
            this.update_dynamics(sourceconfig, timestep);
        }
        const keyDeltaV = 0.06;
        var vel_adjx = 0;
        var vel_adjy = 0;
        if(keyState.w_down) {
            vel_adjy += keyDeltaV;
        }
        if(keyState.d_down) {
            vel_adjx += keyDeltaV;
        }
        if(keyState.s_down) {
            vel_adjy -= keyDeltaV;
        }
        if(keyState.a_down) {
            vel_adjx -= keyDeltaV;
        }
        this.vel = vec2.add(this.vel, this.vel, vec2.fromValues(vel_adjx, vel_adjy));
    }
    update_dynamics(sourceconfig, timestep) {
        // Integrate a single step

        const acc = sourceconfig.calc_accvec(this.pos);
        var upd_pos = vec2.copy(vec2.create(), this.pos);
        upd_pos = vec2.scaleAndAdd(upd_pos, upd_pos, this.vel, timestep);
        upd_pos = vec2.scaleAndAdd(upd_pos, upd_pos, acc, 0.5 * timestep**2);
        const upd_acc = sourceconfig.calc_accvec(upd_pos);
        var upd_vel = vec2.copy(vec2.create(), this.vel);
        upd_vel = vec2.scaleAndAdd(upd_vel, upd_vel, acc, 0.5*timestep);
        upd_vel = vec2.scaleAndAdd(upd_vel, upd_vel, upd_acc, 0.5*timestep);

        this.pos = upd_pos;
        this.vel = upd_vel;
    }
}

class backgroundMap {
    constructor(points, colors, radii) {
        this.n = points.length;
        console.assert(points.length == radii.length, "Lengths not equal");
        console.assert(points.length == colors.length, "Lengths not equal");
        this.mapObjects = [];
        for(var i = 0; i < this.n; i++) {
            this.mapObjects.push({
                point: points[i],
                color: colors[i],
                radius: radii[i]
            });
        }
    }
}
export {sourceConfiguration, movingBody, backgroundMap};